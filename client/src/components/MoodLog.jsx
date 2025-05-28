import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logMood } from "../services/operations/moodLogOperations";

const moodOptions = [
  { label: "😊 Good", value: "good" },
  { label: "😐 Okay", value: "okay" },
  { label: "😔 Sad", value: "sad" },
  { label: "😞 Depressed", value: "depressed" },
];

const MoodLog = () => {
  const dispatch = useDispatch();
  const { moodLog, loading: moodLoading } = useSelector((state) => state.moodLog);

  const [mood, setMood] = useState("");
  const [moodSubmitted, setMoodSubmitted] = useState(false);

  const handleMoodSubmit = useCallback(() => {
    if (!mood) {
      toast.error("Please select your mood");
      return;
    }

    dispatch(logMood(mood))
      .unwrap()
      .then(() => {
        toast.success("Mood recorded! You are not alone.");
        setMoodSubmitted(true);
      })
      .catch(() => toast.error("Failed to record mood"));
  }, [dispatch, mood]);

  return (
    <section className="bg-white rounded-lg shadow p-6 mb-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Daily Mood Check-in</h2>

      {moodLoading ? (
        <p>Loading mood log...</p>
      ) : moodSubmitted || moodLog?.mood ? (
        <p className="text-green-700 font-medium" role="status" aria-live="polite">
          Thank you for sharing your mood today:{" "}
          <span className="italic">
            {moodOptions.find((m) => m.value === (moodLog?.mood || mood))?.label}
          </span>
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            {moodOptions.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                className={`px-4 py-2 rounded-full border transition ${
                  mood === value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
                }`}
                onClick={() => setMood(value)}
                aria-pressed={mood === value}
                aria-label={`Select mood: ${label}`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleMoodSubmit}
            className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
          >
            Submit Mood
          </button>
        </>
      )}
    </section>
  );
};

export default MoodLog;
