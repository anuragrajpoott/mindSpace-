import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResources } from "../services/operations/resourceOperations"; // your existing operation

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

const Resource = () => {
  const dispatch = useDispatch();
  const { resources, loading, error } = useSelector((state) => state.resource);

  useEffect(() => {
    dispatch(getAllResources());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-blue-50 p-8 max-w-4xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Emergency Hotlines & Resources</h1>
        <p className="text-gray-700 max-w-xl mx-auto">
          If you or someone you know is struggling, here are important resources you can call.
          Remember, reaching out is a sign of strength.
        </p>
      </header>

      <section
        aria-live="polite"
        aria-busy={loading}
        className="mb-12 bg-white rounded-lg shadow p-6"
      >
        {loading ? (
          <p>Loading resources...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <ul role="list" className="space-y-4">
            {resources.map(({ _id, country, number, description }) => (
              <li
                key={_id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 pb-3 last:border-0"
                role="listitem"
              >
                <div>
                  <p className="font-semibold text-lg">{country}</p>
                  <p className="text-gray-600 text-sm italic">{description}</p>
                </div>
                <a
                  href={`tel:${number.replace(/\s+/g, "")}`}
                  className="mt-2 sm:mt-0 text-blue-600 underline hover:text-blue-800 font-medium"
                  aria-label={`Call ${country} hotline number ${number}`}
                >
                  {number}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Helpful Coping Techniques</h2>
        <ul className="list-disc list-inside bg-white rounded-lg shadow p-6 space-y-2">
          {copingTips.map((tip, i) => (
            <li key={i} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Self-Care Tips</h2>
        <ul className="list-disc list-inside bg-white rounded-lg shadow p-6 space-y-2">
          {selfCareTips.map((tip, i) => (
            <li key={i} className="text-gray-700">{tip}</li>
          ))}
        </ul>
      </section>

      <footer className="text-center max-w-md mx-auto">
        <p className="text-blue-900 font-semibold mb-2">
          Remember, seeking help is a sign of strength.
        </p>
        <p className="text-gray-700 mb-4">
          Connect with others or reach out to a professional whenever you need support.
        </p>
      </footer>
    </main>
  );
};

export default Resource;
