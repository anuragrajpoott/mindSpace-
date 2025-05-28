import React from "react";

const hotlines = [
  { country: "USA", number: "1-800-273-TALK" },
  { country: "UK", number: "116 123" },
  { country: "India", number: "9152987821" },
];

const SupportResource = ({ loading }) => {
  return (
    <section
      className="mb-10 max-w-4xl mx-auto"
      aria-live="polite"
      aria-busy={loading}
      aria-label="Emergency Hotlines and Resources"
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">
        Emergency Hotlines & Resources
      </h2>
      {loading ? (
        <p>Loading resources...</p>
      ) : (
        <ul className="bg-white rounded-lg shadow p-6 space-y-3" role="list">
          {hotlines.map(({ country, number }) => (
            <li
              key={country}
              className="flex justify-between items-center"
              role="listitem"
            >
              <span className="font-semibold">{country}:</span>
              <a
                href={`tel:${number.replace(/\s+/g, "")}`}
                className="text-blue-600 underline hover:text-blue-800"
                aria-label={`Call ${country} hotline number ${number}`}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SupportResource;
