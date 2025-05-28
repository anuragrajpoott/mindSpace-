import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../services/operations/groupOperations";
import { fetchResources } from "../services/operations/supportResourceOperations";

import MoodLog from "./MoodLog";
import SupportResource from "./SupportResource";
import Groups from "./Groups";
import SupportPosts from "./SupportPosts";

const copingTips = [
  "Practice deep breathing or meditation",
  "Take a walk or get some exercise",
  "Write your thoughts in a journal",
  "Listen to calming music",
];

const selfCareTips = [
  "Get enough sleep",
  "Eat a balanced diet",
  "Stay hydrated",
  "Spend time doing something you enjoy",
];

const Support = () => {
  const dispatch = useDispatch();

  const { supportResource, loading: resourcesLoading } = useSelector((state) => state.supportResource);
  const { groups = [], loading: groupsLoading } = useSelector((state) => state.groups);
  const { supportPost: posts = [], loading: postsLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchResources());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-blue-50 p-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-3">Welcome to Your Support Space</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          You're not alone. This space is here to help you navigate your journey,
          find support, and take small steps towards healing.
        </p>
      </section>

      {/* MoodLog */}
      <MoodLog />

      {/* SupportResource */}
      <SupportResource loading={resourcesLoading} />

      {/* Groups */}
      <Groups groups={groups} loading={groupsLoading} />

      {/* SupportPosts */}
      <SupportPosts posts={posts} loading={postsLoading} />

      {/* Coping Techniques */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Helpful Coping Techniques</h2>
        <ul className="list-disc list-inside bg-white rounded-lg shadow p-6 space-y-2">
          {copingTips.map((technique, i) => (
            <li key={i} className="text-gray-700">{technique}</li>
          ))}
        </ul>
      </section>

      {/* Self-Care Tips */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Self-Care Tips</h2>
        <ul className="list-disc list-inside bg-white rounded-lg shadow p-6 space-y-2">
          {selfCareTips.map((tip, i) => (
            <li key={i} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mb-16 text-center max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-3 text-blue-900">Remember, seeking help is a sign of strength.</h3>
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
