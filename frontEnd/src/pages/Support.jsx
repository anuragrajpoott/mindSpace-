import React, { useState, useEffect } from 'react';
import { FcLike, FcVoicePresentation, FcConferenceCall } from "react-icons/fc";

const dummyGroups = [
  {
    id: 1,
    name: "Anxiety Warriors",
    description: "A safe space to share coping strategies for anxiety.",
    tags: ["Anxiety", "Mindfulness", "Daily Tips"],
    joined: false,
  },
  {
    id: 2,
    name: "Depression Support Circle",
    description: "You are not alone. Join us to talk and heal together.",
    tags: ["Depression", "Peer Talk", "Healing"],
    joined: true,
  },
  {
    id: 3,
    name: "ADHD & Focus",
    description: "Struggling with focus or hyperactivity? We’re here.",
    tags: ["ADHD", "Focus", "Productivity"],
    joined: false,
  },
];

const SupportGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Replace with backend fetch
    setGroups(dummyGroups);
  }, []);

  const toggleJoin = (id) => {
    setGroups(prev =>
      prev.map(group =>
        group.id === id ? { ...group, joined: !group.joined } : group
      )
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-2">
        <FcConferenceCall /> Support Groups
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {groups.map(group => (
          <div key={group.id} className="bg-white rounded-md shadow-md p-6 flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-blue-700">{group.name}</h2>
            <p className="text-gray-700">{group.description}</p>
            <div className="flex gap-2 flex-wrap">
              {group.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => toggleJoin(group.id)}
              className={`mt-3 px-4 py-2 rounded-md text-white ${
                group.joined ? 'bg-red-400' : 'bg-green-500'
              }`}
            >
              {group.joined ? 'Leave Group' : 'Join Group'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportGroups;
