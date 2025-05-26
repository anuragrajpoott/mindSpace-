import React, { useState } from 'react';
import { FcPortraitMode, FcViewDetails } from 'react-icons/fc';

const dummyUser = {
  name: "Anurag Rajpoot",
  bio: "Healing takes time — and that’s okay.",
  profileImage: "", // placeholder
  followers: 125,
  following: 80,
  posts: [
    "Today was tough, but I got through it.",
    "Sharing a journal prompt that helped me: What made me smile today?",
    "Tried breathing exercises today. Felt a bit better.",
  ],
};

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState(dummyUser.bio);

  const saveChanges = () => {
    // Normally you'd update on backend here
    setEdit(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="bg-white rounded-md shadow-md p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center">
            {dummyUser.profileImage ? (
              <img src={dummyUser.profileImage} alt="Profile" className="rounded-full h-full w-full" />
            ) : (
              <FcPortraitMode size={48} />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{dummyUser.name}</h2>
            <p className="text-gray-600">{dummyUser.followers} followers • {dummyUser.following} following</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Bio</h3>
          {edit ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border rounded-md p-2"
              />
              <button onClick={saveChanges} className="bg-green-500 text-white px-4 py-2 rounded-md w-fit">Save</button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p>{bio}</p>
              <button onClick={() => setEdit(true)} className="text-blue-600 underline">Edit</button>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2 flex items-center gap-1"><FcViewDetails /> Posts</h3>
          <ul className="space-y-2">
            {dummyUser.posts.map((post, i) => (
              <li key={i} className="bg-blue-100 rounded-md p-3">{post}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
