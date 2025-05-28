import React, { useState } from "react";

const UpdatePasswordModal = ({ show, onClose, onUpdatePassword, loading }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("Please fill all password fields");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      alert("New password should be at least 6 characters");
      return;
    }
    onUpdatePassword({ currentPassword, newPassword });
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-password-title"
    >
      <div className="bg-white rounded-lg p-6 w-96 max-w-full relative shadow-lg">
        <h2
          id="update-password-title"
          className="text-xl font-semibold mb-4 text-blue-900"
        >
          Update Password
        </h2>

        <label className="block mb-2 font-medium" htmlFor="currentPassword">
          Current Password
        </label>
        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
          disabled={loading}
          autoComplete="current-password"
        />

        <label className="block mb-2 font-medium" htmlFor="newPassword">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-md p-2 mb-4"
          disabled={loading}
          autoComplete="new-password"
        />

        <label className="block mb-2 font-medium" htmlFor="confirmNewPassword">
          Confirm New Password
        </label>
        <input
          id="confirmNewPassword"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full border rounded-md p-2 mb-6"
          disabled={loading}
          autoComplete="new-password"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            type="button"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
