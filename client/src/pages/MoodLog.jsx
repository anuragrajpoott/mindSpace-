import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createMoodLog } from "../services/operations/moodLogOperations";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const moodOptions = [
  { label: "😊 Good", value: "good" },
  { label: "😐 Okay", value: "okay" },
  { label: "😔 Sad", value: "sad" },
  { label: "😞 Depressed", value: "depressed" },
];

const moodTips = {
  good: [
    "Keep up the positive vibes!",
    "Share your good mood with others.",
    "Try a gratitude journal.",
  ],
  okay: [
    "It's okay to have ups and downs.",
    "Try some deep breathing exercises.",
    "Take a short walk to clear your mind.",
  ],
  sad: [
    "Remember, it's okay to feel sad sometimes.",
    "Try reaching out to a friend or loved one.",
    "Engage in a hobby you enjoy.",
  ],
  depressed: [
    "You are not alone. Consider talking to a professional.",
    "Practice self-care and be gentle with yourself.",
    "Try grounding techniques like mindfulness or meditation.",
  ],
};

const NEWS_API_KEY = "YOUR_NEWSAPI_KEY"; // Replace with your NewsAPI key

const MoodLog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ mood: "", note: "" });
  const [moodSubmitted, setMoodSubmitted] = useState(false);
  const [submittedMood, setSubmittedMood] = useState(null);

  const [helpArticles, setHelpArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [articlesError, setArticlesError] = useState(null);

  const { mood, note } = formData;
  const { loading, error } = useSelector((state) => state.moodLog);
  const { token } = useSelector((state) => state.user);

  

  useEffect(() => {
    if (moodSubmitted) {
      const timer = setTimeout(() => {
        setMoodSubmitted(false);
        setSubmittedMood(null);
        setHelpArticles([]);
        setArticlesError(null);
      }, 3600000);
      return () => clearTimeout(timer);
    }
  }, [moodSubmitted]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!submittedMood) return;

      setLoadingArticles(true);
      setArticlesError(null);
      setHelpArticles([]);

      try {
        // We'll search for articles containing "mental health" + mood keyword
        const queryMood =
          submittedMood === "good" ? "mental health wellness" : submittedMood;

        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=mental+health+${queryMood}&language=en&sortBy=relevance&pageSize=5&apiKey=${NEWS_API_KEY}`
        );

        setHelpArticles(response.data.articles || []);
      } catch (err) {
        setArticlesError("Failed to load helpful articles.");
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchArticles();
  }, [submittedMood]);

  const handleMoodSubmit = async () => {
    if (!mood) {
      toast.error("Please select your mood");
      return;
    }

    try {
      await dispatch(createMoodLog(token,formData, navigate));
      toast.success("Mood recorded! You are not alone.");
      setMoodSubmitted(true);
      setSubmittedMood(mood);
      setFormData({ mood: "", note: "" });
    } catch (err) {
      toast.error(err?.message || "Failed to record mood");
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        Daily Mood Check-In
      </h2>

      {moodSubmitted && submittedMood ? (
        <div role="alert" aria-live="polite" className="space-y-6">
          <p className="text-green-700 text-lg text-center font-medium">
            Thank you for sharing your mood today:{" "}
            <span className="italic font-semibold">
              {moodOptions.find((m) => m.value === submittedMood)?.label}
            </span>
          </p>

          <div className="bg-blue-50 border border-blue-300 rounded-md p-4">
            <h3 className="font-semibold text-blue-700 mb-2">
              Tips to help you feel better:
            </h3>
            <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
              {moodTips[submittedMood]?.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              )) || <li>Take care and be kind to yourself.</li>}
            </ul>
          </div>

          <div className="bg-green-50 border border-green-300 rounded-md p-4">
            <h3 className="font-semibold text-green-700 mb-2">
              Helpful Articles
            </h3>

            {loadingArticles && (
              <p className="text-green-700">Loading articles...</p>
            )}

            {articlesError && (
              <p className="text-red-600">{articlesError}</p>
            )}

            {!loadingArticles && !articlesError && helpArticles.length === 0 && (
              <p className="text-green-700">No articles found at the moment.</p>
            )}

            <ul className="list-disc list-inside space-y-2 text-green-800">
              {helpArticles.map(({ url, title, description, publishedAt }) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-green-900"
                  >
                    {title}
                  </a>
                  {description && (
                    <p className="text-sm text-green-700">{description}</p>
                  )}
                  <small className="text-xs text-green-600">
                    Published: {new Date(publishedAt).toLocaleDateString()}
                  </small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div
            className="flex flex-wrap gap-4 justify-center mb-6"
            role="radiogroup"
            aria-label="Select your mood"
          >
            {moodOptions.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                className={`px-5 py-2 rounded-full border text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  mood === value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"
                }`}
                onClick={() => setFormData((prev) => ({ ...prev, mood: value }))}
                aria-pressed={mood === value}
                aria-label={label}
              >
                {label}
              </button>
            ))}
          </div>

          <textarea
            className="w-full border rounded-md p-3 text-sm text-gray-700 mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows="4"
            placeholder="Optional: add a note about your day..."
            value={note}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, note: e.target.value }))
            }
            aria-label="Optional note about your day"
          />

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleMoodSubmit}
              className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition disabled:opacity-50"
              aria-disabled={!mood || loading}
              disabled={!mood || loading}
            >
              {loading ? "Saving..." : "Submit Mood"}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-center text-red-600 text-sm">{error}</p>
          )}
        </>
      )}
    </section>
  );
};

export default MoodLog;
