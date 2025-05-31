import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllResources } from "../services/operations/resourceOperations";

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
  const { token } = useSelector((state) => state.user);

  // State for external resources
  const [externalResources, setExternalResources] = useState([]);
  const [externalLoading, setExternalLoading] = useState(false);
  const [externalError, setExternalError] = useState(null);

  useEffect(() => {
    dispatch(getAllResources(token));
  }, [dispatch]);

  useEffect(() => {
    // Fetch external resources example
    const fetchExternalResources = async () => {
      setExternalLoading(true);
      setExternalError(null);
      try {
        const response = await fetch("https://api.example.com/external-resources");
        if (!response.ok) throw new Error("Failed to fetch external resources");
        const data = await response.json();
        setExternalResources(data.resources); // adapt based on actual API response
      } catch (err) {
        setExternalError(err.message);
      } finally {
        setExternalLoading(false);
      }
    };

    fetchExternalResources();
  }, []);

  return (
    <main className="min-h-screen bg-blue-50 p-8 max-w-4xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          Emergency Hotlines & Resources
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto">
          If you or someone you know is struggling, here are important
          resources you can call. Remember, reaching out is a sign of strength.
        </p>
      </header>

      {/* Your existing resource list */}
      <section
        aria-live="polite"
        aria-busy={loading}
        aria-label="List of emergency hotlines and resources"
        className="mb-12 bg-white rounded-lg shadow p-6 min-h-[6rem]"
      >
        {loading ? (
          <p>Loading resources...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : resources.length === 0 ? (
          <p>No resources found.</p>
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

      {/* New External Resources section */}
      <section
        aria-live="polite"
        aria-busy={externalLoading}
        aria-label="List of external mental health resources"
        className="mb-12 bg-white rounded-lg shadow p-6 min-h-[6rem]"
      >
        <h2 className="text-3xl font-semibold mb-6 text-blue-800">
          Additional Mental Health Resources
        </h2>

        {externalLoading ? (
          <p>Loading external resources...</p>
        ) : externalError ? (
          <p className="text-red-600">Error: {externalError}</p>
        ) : externalResources.length === 0 ? (
          <p>No external resources found.</p>
        ) : (
          <ul role="list" className="space-y-4">
            {externalResources.map(({ id, title, url, description }) => (
              <li
                key={id}
                className="border-b border-gray-200 pb-3 last:border-0"
                role="listitem"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-lg text-blue-600 underline hover:text-blue-800"
                >
                  {title}
                </a>
                <p className="text-gray-600 text-sm italic">{description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">
          Helpful Coping Techniques
        </h2>
        <ul className="list-disc list-inside bg-white rounded-lg shadow p-6 space-y-2">
          {copingTips.map((tip, i) => (
            <li key={i} className="text-gray-700">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">Self-Care Tips</h2>
        <ul className="list-disc list-inside bg-white rounded-lg shadow p-6 space-y-2">
          {selfCareTips.map((tip, i) => (
            <li key={i} className="text-gray-700">
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <footer className="text-center max-w-md mx-auto">
        <p className="text-blue-900 font-semibold mb-2">
          Remember, seeking help is a sign of strength.
        </p>
        <p className="text-gray-700 mb-4">
          Connect with others or reach out to a professional whenever you need
          support.
        </p>
      </footer>
    </main>
  );
};

export default Resource;
