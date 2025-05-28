import React, { useEffect, useState, useRef, useCallback } from "react";
import { FcPortraitMode, FcViewDetails, FcEditImage } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  updatePassword,
} from "../services/operations/userOperations";
import toast from "react-hot-toast";
import UpdatePasswordModal from "../components/UpdatePasswordModal";

const MAX_BIO_LENGTH = 300;

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [edit, setEdit] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [updatingBio, setUpdatingBio] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Load profile on mount and when user ID changes
  useEffect(() => {
    if (!user?._id) return;

    async function loadProfile() {
      try {
        const profileData = await dispatch(fetchProfile(user._id)).unwrap();
        setProfile(profileData);
        setBio(profileData.bio || "");
      } catch {
        toast.error("Failed to load profile");
      }
    }

    loadProfile();
  }, [dispatch, user?._id]);

  // Save bio changes
  const saveChanges = useCallback(async () => {
    if (bio.trim() === "") {
      toast.error("Bio cannot be empty");
      return;
    }
    try {
      setUpdatingBio(true);
      await dispatch(updateProfile({ bio })).unwrap();

      toast.success("Bio updated!");
      setEdit(false);

      // Refresh profile after update
      const updatedProfile = await dispatch(fetchProfile(user._id)).unwrap();
      setProfile(updatedProfile);
      setBio(updatedProfile.bio || "");
    } catch {
      toast.error("Failed to update bio");
    } finally {
      setUpdatingBio(false);
    }
  }, [bio, dispatch, user?._id]);

  // Open file picker for profile image upload
  const onProfileImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Handle profile image file selection and upload
  const handleImageChange = useCallback(
    async (e) => {
      if (!e.target.files?.length) return;
      const file = e.target.files[0];
      try {
        setUploadingImage(true);

        const formData = new FormData();
        formData.append("profileImage", file);

        await dispatch(updateProfile(formData)).unwrap();

        toast.success("Profile image updated!");

        // Refresh profile after image update
        const updatedProfile = await dispatch(fetchProfile(user._id)).unwrap();
        setProfile(updatedProfile);
      } catch {
        toast.error("Failed to upload image");
      } finally {
        setUploadingImage(false);
      }
    },
    [dispatch, user?._id]
  );

  // Handle password update from modal
  const handleUpdatePassword = async ({ currentPassword, newPassword }) => {
    setPasswordLoading(true);
    try {
      await dispatch(updatePassword({ currentPassword, newPassword })).unwrap();

      toast.success("Password updated successfully!");
      setShowPasswordModal(false);
    } catch (error) {
      toast.error(error.message || "Failed to update password");
    }
    setPasswordLoading(false);
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  }

  if (!profile) {
    return (
      <p className="text-center mt-10 text-gray-600">No profile data available.</p>
    );
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
                alt={`${profile.name}'s profile picture`}
                className="rounded-full h-32 w-32 object-cover"
              />
            ) : (
              <div className="rounded-full h-32 w-32 bg-gray-200 flex items-center justify-center">
                <FcPortraitMode size={72} />
              </div>
            )}
            <button
              title="Change profile image"
              aria-describedby="uploadHelp"
              onClick={onProfileImageClick}
              className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
              disabled={uploadingImage}
            >
              <FcEditImage size={24} />
            </button>
            <span id="uploadHelp" className="sr-only">
              Opens file picker to upload a new profile image
            </span>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              disabled={uploadingImage}
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-900">{profile.name}</h2>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">{profile.followers}</span> followers •{" "}
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
                    onChange={(e) => setBio(e.target.value.slice(0, MAX_BIO_LENGTH))}
                    className="border rounded-md p-3 min-h-[80px]"
                    maxLength={MAX_BIO_LENGTH}
                    disabled={updatingBio}
                  />
                  <p className="text-sm text-gray-500 text-right">
                    {bio.length}/{MAX_BIO_LENGTH}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={saveChanges}
                      disabled={bio.trim() === "" || updatingBio}
                      className={`text-white px-5 py-2 rounded-md transition ${
                        bio.trim() === "" || updatingBio
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {updatingBio ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setBio(profile.bio || "");
                        setEdit(false);
                      }}
                      className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-md transition"
                      type="button"
                      disabled={updatingBio}
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

            {/* Update Password Button */}
            <div className="mt-6">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="bg-amber-200 hover:bg-amber-300 px-5 py-2 rounded font-semibold"
                type="button"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <section className="mt-10">
          <h3 className="text-2xl font-semibold flex items-center gap-2 mb-4 text-blue-800">
            <FcViewDetails /> Posts
          </h3>

          {profile.posts?.length === 0 ? (
            <p className="text-gray-600">You have no posts yet.</p>
          ) : (
            <ul className="space-y-4 max-w-3xl">
              {profile.posts?.map((post) => (
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

        {/* Update Password Modal */}
        <UpdatePasswordModal
          show={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onUpdatePassword={handleUpdatePassword}
          loading={passwordLoading}
        />
      </div>
    </div>
  );
};

export default Profile;
