import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcPortraitMode, FcViewDetails, FcEditImage } from "react-icons/fc";
import toast from "react-hot-toast";

import {
  updateProfile
} from "../services/operations/userOperations";

const MAX_BIO_LENGTH = 300;

const Profile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { profile, loading, error } = useSelector((state) => state.user);

  const [bio, setBio] = useState(profile?.bio || "");
  const [edit, setEdit] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Save bio handler
  const handleSaveBio = async () => {
    if (bio.trim() === "") {
      toast.error("Bio cannot be empty");
      return;
    }
    try {
      setBioLoading(true);
      await dispatch(updateProfile({ bio })).unwrap();
      toast.success("Bio updated!");
      setEdit(false);
    } catch (err) {
      toast.error(err?.message || "Failed to update bio");
    } finally {
      setBioLoading(false);
    }
  };

  // File picker open
  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  // Upload profile image handler
  const handleImageChange = async (e) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        setImageLoading(true);
        // Assuming uploadProfileImage expects base64 or FormData - adjust if needed
        await dispatch(updateProfile({ image: reader.result })).unwrap();
        toast.success("Profile image updated!");
      } catch (err) {
        toast.error(err?.message || "Failed to upload image");
      } finally {
        setImageLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  // Password update handler
  const handleUpdatePassword = async ({ currentPassword, newPassword }) => {
    try {
      setPasswordLoading(true);
      await dispatch(updateProfile({ currentPassword, newPassword })).unwrap();
      toast.success("Password updated successfully!");
      setPasswordModalOpen(false);
    } catch (err) {
      toast.error(err?.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Reset bio input on cancel
  const handleCancelEdit = () => {
    setBio(profile?.bio || "");
    setEdit(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
      <div className="bg-white rounded-md shadow-md p-8 max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image + Upload */}
          <div className="relative">
            {profile?.profileImage ? (
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
              onClick={handleProfileImageClick}
              className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
              disabled={imageLoading}
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
              disabled={imageLoading}
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-900">{profile?.name}</h2>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">{profile?.followers ?? 0}</span> followers •{" "}
              <span className="font-semibold">{profile?.following ?? 0}</span> following
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
                    disabled={bioLoading}
                  />
                  <p className="text-sm text-gray-500 text-right">
                    {bio.length}/{MAX_BIO_LENGTH}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveBio}
                      disabled={bio.trim() === "" || bioLoading}
                      className={`text-white px-5 py-2 rounded-md transition ${
                        bio.trim() === "" || bioLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {bioLoading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-md transition"
                      type="button"
                      disabled={bioLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {profile?.bio || "No bio set yet."}
                  </p>
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
                onClick={() => setPasswordModalOpen(true)}
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

          {profile?.posts?.length === 0 ? (
            <p className="text-gray-600">You have no posts yet.</p>
          ) : (
            <ul className="space-y-4 max-w-3xl">
              {profile?.posts?.map((post) => (
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

        {/* Password Modal (simple example, implement your own modal) */}
        {passwordModalOpen && (
          <PasswordModal
            loading={passwordLoading}
            onClose={() => setPasswordModalOpen(false)}
            onSubmit={handleUpdatePassword}
          />
        )}
      </div>
    </div>
  );
};

// Simple Password Modal example, you can replace with your own modal implementation
const PasswordModal = ({ loading, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-md p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Update Password</h2>
        <label className="block mb-2">
          Current Password
          <input
            type="password"
            className="border p-2 w-full rounded"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={loading}
          />
        </label>
        <label className="block mb-4">
          New Password
          <input
            type="password"
            className="border p-2 w-full rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
          />
        </label>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit({ currentPassword, newPassword })}
            disabled={loading || !currentPassword || !newPassword}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
