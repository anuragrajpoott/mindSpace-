import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createMoodLog } from "../services/operations/moodLogOperations";
import { useNavigate } from "react-router-dom";

const moodOptions = [
  { label: "😊 Good", value: "good" },
  { label: "😐 Okay", value: "okay" },
  { label: "😔 Sad", value: "sad" },
  { label: "😞 Depressed", value: "depressed" },
];

const MoodLog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ mood: "", note: "" });
  const { mood, note } = formData;
  const [moodSubmitted, setMoodSubmitted] = useState(false);

  const { loading, error } = useSelector((state) => state.moodLog);

  const handleMoodSubmit = async () => {
    if (!mood) {
      toast.error("Please select your mood");
      return;
    }

    try {
      await dispatch(createMoodLog(formData, navigate));
      toast.success("Mood recorded! You are not alone.");
      setMoodSubmitted(true);
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

      {moodSubmitted ? (
        <p className="text-green-700 text-lg text-center font-medium">
          Thank you for sharing your mood today:{" "}
          <span className="italic font-semibold">
            {moodOptions.find((m) => m.value === mood)?.label}
          </span>
        </p>
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
                onClick={() =>
                  setFormData((prev) => ({ ...prev, mood: value }))
                }
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
