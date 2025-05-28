import React from "react";

const Groups = ({ groups, loading }) => {
  return (
    <section className="mb-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-800">Support Groups</h2>
      {loading ? (
        <p>Loading groups...</p>
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
              <p className="text-gray-600">{group.description || "No description available."}</p>
              <p className="mt-2 text-sm text-gray-500">{group.membersCount || 0} members</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Groups;
