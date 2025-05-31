import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcPortraitMode, FcViewDetails, FcEditImage, FcList } from "react-icons/fc";
import toast from "react-hot-toast";

import { updateProfile } from "../services/operations/userOperations";

const MAX_about_LENGTH = 300;

const Profile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // Redux user state
  const { token,user, loading } = useSelector((state) => state.user);

  // console.log(user)

  // Local state for editable fields
  const [editableFields, setEditableFields] = useState({
    fullName: false,
    userName: false,
    about: false,
  });

  // Editable values stored locally
  const [formValues, setFormValues] = useState({
    fullName: "",
    userName: "",
    about: "",
  });

  const [aboutLoading, setaboutLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Sync user info into local form values when user updates
  useEffect(() => {
    setFormValues({
      fullName: user?.fullName || "",
      userName: user?.userName || "",
      about: user?.about || "",
    });
  }, [user]);

  // Handle input changes
  const handleChange = (field) => (e) => {
    const value = field === "about" ? e.target.value.slice(0, MAX_about_LENGTH) : e.target.value;
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Save updated field
  const handleSave = async (field) => {
    const newValue = formValues[field].trim();

    if (!newValue) {
      toast.error(`${field === "about" ? "about" : field === "fullName" ? "Full name" : "UserName"} cannot be empty`);
      return;
    }

    try {
      if (field === "userName" && newValue.includes(" ")) {
        toast.error("UserName cannot contain spaces");
        return;
      }

      if (field === "about") setaboutLoading(true);

      await dispatch(updateProfile(token,{ [field === "fullName" ? "name" : field]: newValue })).unwrap();
      toast.success(`${field === "about" ? "about" : field === "fullName" ? "Full name" : "UserName"} updated!`);

      setEditableFields((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      toast.error(error?.message || `Failed to update ${field}`);
    } finally {
      if (field === "about") setaboutLoading(false);
    }
  };

  // Cancel editing resets field to user value
  const handleCancel = (field) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: user?.[field === "fullName" ? "name" : field] || "",
    }));
    setEditableFields((prev) => ({ ...prev, [field]: false }));
  };

  // user image upload
  const handleuserImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setImageLoading(true);
        await dispatch(updateProfile(token,{ image: reader.result })).unwrap();
        toast.success("user image updated!");
      } catch (error) {
        toast.error(error?.message || "Failed to upload image");
      } finally {
        setImageLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Password update modal handler
  // const handleUpdatePassword = async ({ currentPassword, newPassword }) => {
  //   try {
  //     setPasswordLoading(true);
  //     await dispatch(updateProfile({ currentPassword, newPassword })).unwrap();
  //     toast.success("Password updated successfully!");
  //     setPasswordModalOpen(false);
  //   } catch (error) {
  //     toast.error(error?.message || "Failed to update password");
  //   } finally {
  //     setPasswordLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
      <div className="bg-white rounded-md shadow-md p-8 max-w-5xl w-full space-y-8">
        {/* User Info Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* user Image */}
          <div className="relative">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.fullName}'s user`}
                className="rounded-full h-32 w-32 object-cover"
              />
            ) : (
              <div className="rounded-full h-32 w-32 bg-gray-200 flex items-center justify-center">
                <FcPortraitMode size={72} />
              </div>
            )}
            <button
              title="Change user image"
              aria-describedby="uploadHelp"
              onClick={handleuserImageClick}
              className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
              disabled={imageLoading}
            >
              <FcEditImage size={24} />
            </button>
            <span id="uploadHelp" className="sr-only">
              Opens file picker to upload a new user image
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

          {/* Editable User Details */}
          <div className="flex-1 space-y-6">
            {/* Full Name */}
            <EditableField
              label="Full Name"
              fieldKey="fullName"
              value={formValues.fullName}
              isEditing={editableFields.fullName}
              onEdit={() => setEditableFields((prev) => ({ ...prev, fullName: true }))}
              onChange={handleChange("fullName")}
              onSave={() => handleSave("fullName")}
              onCancel={() => handleCancel("fullName")}
              loading={aboutLoading}
            />

            {/* UserName */}
            <EditableField
              label="UserName"
              fieldKey="userName"
              value={formValues.userName}
              isEditing={editableFields.userName}
              onEdit={() => setEditableFields((prev) => ({ ...prev, userName: true }))}
              onChange={handleChange("userName")}
              onSave={() => handleSave("userName")}
              onCancel={() => handleCancel("userName")}
              loading={aboutLoading}
              inputProps={{ spellCheck: false }}
            />

            {/* about / About */}
            <EditableField
              label="About / about"
              fieldKey="about"
              value={formValues.about}
              isEditing={editableFields.about}
              onEdit={() => setEditableFields((prev) => ({ ...prev, about: true }))}
              onChange={handleChange("about")}
              onSave={() => handleSave("about")}
              onCancel={() => handleCancel("about")}
              loading={aboutLoading}
              isTextarea
              maxLength={MAX_about_LENGTH}
              charCount={formValues.about.length}
            />

          

            {/* Update Password Button */}
            <div>
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
        <section>
          <h3 className="text-2xl font-semibold flex items-center gap-2 mb-4 text-blue-800">
            <FcViewDetails /> Posts
          </h3>

          {user?.posts?.length === 0 ? (
            <p className="text-gray-600">No posts yet.</p>
          ) : (
            <ul className="space-y-4 max-w-3xl">
              {user?.posts?.map((post) => (
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

        {/* Resources Section */}
        <section>
          <h3 className="text-2xl font-semibold flex items-center gap-2 mb-4 text-blue-800">
            <FcList /> Resources
          </h3>

          {user?.resources?.length === 0 ? (
            <p className="text-gray-600">No resources yet.</p>
          ) : (
            <ul className="space-y-4 max-w-3xl">
              {user?.resources?.map((resource) => (
                <li key={resource._id} className="bg-green-100 p-4 rounded-md shadow-sm">
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 hover:underline"
                  >
                    {resource.title}
                  </a>
                  <p className="text-gray-700 mt-1 whitespace-pre-wrap">{resource.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

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

// EditableField component to reduce duplication for input/textarea + buttons
const EditableField = ({
  label,
  fieldKey,
  value,
  isEditing,
  onEdit,
  onChange,
  onSave,
  onCancel,
  loading,
  isTextarea = false,
  maxLength,
  charCount,
  inputProps = {},
}) => {
  return (
    <div className="max-w-xl">
      <label className="block font-semibold text-lg mb-1">{label}</label>
      {isEditing ? (
        <>
          {isTextarea ? (
            <>
              <textarea
                aria-label={`Edit your ${label.toLowerCase()}`}
                value={value}
                onChange={onChange}
                className="border rounded-md p-3 min-h-[80px] w-full"
                maxLength={maxLength}
                disabled={loading}
                {...inputProps}
              />
              {maxLength && (
                <p className="text-sm text-gray-500 text-right">{charCount}/{maxLength}</p>
              )}
            </>
          ) : (
            <input
              type="text"
              aria-label={`Edit your ${label.toLowerCase()}`}
              value={value}
              onChange={onChange}
              className="border rounded-md p-3 w-full"
              disabled={loading}
              {...inputProps}
            />
          )}

          <div className="flex gap-3 mt-2">
            <button
              onClick={onSave}
              disabled={!value.trim() || loading}
              className={`text-white px-5 py-2 rounded-md transition ${
                !value.trim() || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              type="button"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-md transition"
              type="button"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-gray-800 whitespace-pre-wrap">{value || `No ${label.toLowerCase()} set.`}</p>
          <button
            onClick={onEdit}
            className="text-blue-600 underline hover:text-blue-700"
            type="button"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

const PasswordModal = ({ loading, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }
    onSubmit({ currentPassword, newPassword });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50"
    >
      <div className="bg-white rounded-md p-6 w-full max-w-md space-y-6">
        <h2 className="text-xl font-semibold">Update Password</h2>
        <div className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={loading}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded border border-gray-300 hover:bg-gray-100"
            type="button"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            type="button"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
