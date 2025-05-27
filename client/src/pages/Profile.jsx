import React, { useEffect, useState, useRef } from 'react';
import { FcPortraitMode, FcViewDetails, FcEditImage } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateBio, uploadProfileImage } from '../redux/actions/profileActions'; // assume uploadProfileImage exists
import toast from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(state => state.profile);
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfile())
      .unwrap()
      .then(data => setBio(data.bio || ''))
      .catch(() => toast.error('Failed to load profile'));
  }, [dispatch]);

  const saveChanges = () => {
    if (bio.trim() === '') {
      toast.error('Bio cannot be empty');
      return;
    }
    dispatch(updateBio(bio))
      .unwrap()
      .then(() => {
        toast.success('Bio updated!');
        setEdit(false);
      })
      .catch(() => toast.error('Failed to update bio'));
  };

  const onProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    try {
      await dispatch(uploadProfileImage(file)).unwrap();
      toast.success('Profile image updated!');
      dispatch(fetchProfile());
    } catch {
      toast.error('Failed to upload image');
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
      <div className="bg-white rounded-md shadow-md p-8 max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image + Upload */}
          <div className="relative">
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="rounded-full h-32 w-32 object-cover"
              />
            ) : (
              <div className="rounded-full h-32 w-32 bg-gray-200 flex items-center justify-center">
                <FcPortraitMode size={72} />
              </div>
            )}
            <button
              title="Change profile image"
              onClick={onProfileImageClick}
              className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
            >
              <FcEditImage size={24} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-900">{profile.name}</h2>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">{profile.followers}</span> followers •{' '}
              <span className="font-semibold">{profile.following}</span> following
            </p>

            {/* Bio Section */}
            <div className="mt-6 max-w-xl">
              <h3 className="font-semibold text-xl mb-2">Bio</h3>
              {edit ? (
                <div className="flex flex-col gap-3">
                  <textarea
                    aria-label="Edit your bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="border rounded-md p-3 min-h-[80px]"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={saveChanges}
                      disabled={bio.trim() === ''}
                      className={`text-white px-5 py-2 rounded-md transition ${
                        bio.trim() === '' ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setBio(profile.bio || '');
                        setEdit(false);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-md transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-gray-800 whitespace-pre-wrap">{bio || "No bio set yet."}</p>
                  <button
                    onClick={() => setEdit(true)}
                    className="text-blue-600 underline hover:text-blue-700"
                    type="button"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold flex items-center gap-2 mb-4 text-blue-800">
            <FcViewDetails /> Posts
          </h3>

          {profile.posts.length === 0 ? (
            <p className="text-gray-600">You have no posts yet.</p>
          ) : (
            <ul className="space-y-4 max-w-3xl">
              {profile.posts.map((post) => (
                <li
                  key={post._id}
                  className="bg-blue-100 p-4 rounded-md shadow-sm whitespace-pre-wrap"
                >
                  {post.content}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
