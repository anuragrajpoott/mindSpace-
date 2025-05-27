import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchGroups } from "../redux/actions/groupActions";
import { fetchPosts } from "../redux/actions/postActions";
import { fetchMoodLog, submitMoodLog } from "../redux/actions/moodActions";
import { fetchSupportResources } from "../redux/actions/resourceActions";

const moodOptions = [
  { label: "😊 Good", value: "good" },
  { label: "😐 Okay", value: "okay" },
  { label: "😔 Sad", value: "sad" },
  { label: "😞 Depressed", value: "depressed" },
];

const Support = () => {
  const dispatch = useDispatch();

  const { moodLog, loading: moodLoading } = useSelector((state) => state.mood);
  const {
    hotlines = [],
    copingTips = [],
    selfCareTips = [],
    loading: resourcesLoading,
    error: resourcesError,
  } = useSelector((state) => state.resources);
  const {
    groups = [],
    loading: groupsLoading,
    error: groupsError,
  } = useSelector((state) => state.groups);
  const {
    posts = [],
    loading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);

  const [mood, setMood] = useState("");
  const [moodSubmitted, setMoodSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchPosts());
    dispatch(fetchMoodLog());
    dispatch(fetchSupportResources());
  }, [dispatch]);

  const handleMoodSubmit = useCallback(() => {
    if (!mood) {
      toast.error("Please select your mood");
      return;
    }

    dispatch(submitMoodLog(mood))
      .unwrap()
      .then(() => {
        toast.success("Mood recorded! You are not alone.");
        setMoodSubmitted(true);
      })
      .catch(() => toast.error("Failed to record mood"));
  }, [dispatch, mood]);

  return (
    <div className="min-h-screen bg-blue-50 p-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-3">
          Welcome to Your Support Space
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          You're not alone. This space is here to help you navigate your journey,
          find support, and take small steps towards healing.
        </p>
      </section>

      {/* Daily Mood Check-in */}
      <section
        aria-labelledby="daily-mood-checkin-heading"
        className="bg-white rounded-lg shadow p-6 mb-10 max-w-3xl mx-auto"
      >
        <h2
          id="daily-mood-checkin-heading"
          className="text-2xl font-semibold mb-4 text-blue-800"
        >
          Daily Mood Check-in
        </h2>
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

      {/* Support Resources */}
      <section
        aria-labelledby="emergency-hotlines-heading"
        className="mb-10 max-w-4xl mx-auto"
      >
        <h2
          id="emergency-hotlines-heading"
          className="text-2xl font-semibold mb-4 text-blue-800"
        >
          Emergency Hotlines & Resources
        </h2>
        {resourcesLoading ? (
          <p>Loading resources...</p>
        ) : resourcesError ? (
          <p className="text-red-600" role="alert">
            {resourcesError}
          </p>
        ) : (
          <ul className="bg-white rounded-lg shadow p-6 space-y-3">
            {hotlines.map(({ country, number }) => (
              <li key={country} className="flex justify-between items-center">
                <span className="font-semibold">{country}:</span>
                <a
                  href={`tel:${number}`}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Support Groups */}
      <section
        aria-labelledby="support-groups-heading"
        className="mb-10 max-w-5xl mx-auto"
      >
        <h2
          id="support-groups-heading"
          className="text-2xl font-semibold mb-4 text-blue-800"
        >
          Support Groups
        </h2>
        {groupsLoading ? (
          <p>Loading groups...</p>
        ) : groupsError ? (
          <p className="text-red-600" role="alert">
            {groupsError}
          </p>
        ) : groups.length === 0 ? (
          <p>No support groups available yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <li
                key={group._id}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">{group.name}</h3>
                <p className="text-gray-600">
                  {group.description || "No description available."}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {group.membersCount || 0} members
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Community Posts */}
      <section
        aria-labelledby="community-posts-heading"
        className="mb-10 max-w-5xl mx-auto"
      >
        <h2
          id="community-posts-heading"
          className="text-2xl font-semibold mb-4 text-blue-800"
        >
          Recent Community Posts
        </h2>
        {postsLoading ? (
          <p>Loading posts...</p>
        ) : postsError ? (
          <p className="text-red-600" role="alert">
            {postsError}
          </p>
        ) : posts.length === 0 ? (
          <p>No recent posts.</p>
        ) : (
          <ul className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <li
                key={post._id}
                className="bg-white rounded-lg shadow p-4 whitespace-pre-wrap"
              >
                <p className="text-gray-800">{post.content}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Coping Techniques */}
      <section
        aria-labelledby="coping-techniques-heading"
        className="mb-10 max-w-3xl mx-auto"
      >
        <h2
          id="coping-techniques-heading"
          className="text-2xl font-semibold mb-4 text-blue-800"
        >
          Helpful Coping Techniques
        </h2>
        <ul className="list-disc list-inside bg-white rounded-lg shadow p-6 space-y-2">
          {copingTips.map((technique, i) => (
            <li key={i} className="text-gray-700">
              {technique}
            </li>
          ))}
        </ul>
      </section>

      {/* Self-Care Tips */}
      <section
        aria-labelledby="self-care-tips-heading"
        className="mb-10 max-w-3xl mx-auto"
      >
        <h2
          id="self-care-tips-heading"
          className="text-2xl font-semibold mb-4 text-blue-800"
        >
          Self-Care Tips
        </h2>
        <ul className="list-disc list-inside bg-white rounded-lg shadow p-6 space-y-2">
          {selfCareTips.map((tip, i) => (
            <li key={i} className="text-gray-700">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mb-16 text-center max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-3 text-blue-900">
          Remember, seeking help is a sign of strength.
        </h3>
        <p className="text-gray-700 mb-4">
          Connect with others in the community or reach out to a professional if
          you need support.
        </p>
        <button
          type="button"
          onClick={() => (window.location.href = "/sign-up")}
          className="bg-amber-400 hover:bg-amber-500 px-6 py-3 rounded-md font-semibold text-blue-900 transition"
        >
          Join the Community
        </button>
      </section>
    </div>
  );
};

export default Support;
