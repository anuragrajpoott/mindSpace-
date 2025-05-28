// src/pages/Settings.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateUserSettings } from "../services/operations/userOperations"; // Your thunk action
import logo from "../assets/images/logo.png";
import { FcCloseUpMode } from "react-icons/fc";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    dispatch(updateUserSettings(formData, navigate));
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-10">
      {/* Header */}
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logo} alt="logo" className="h-10" />
        <span className="font-bold text-xl">Mind Space +</span>
      </Link>

      {/* Settings Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-5"
      >
        <h2 className="text-2xl font-semibold">Account Settings</h2>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">Name</span>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="border-2 p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">Email</span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="border-2 p-2 rounded"
            required
          />
        </label>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">Current Password</span>
          <input
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Leave blank if no change"
            className="border-2 p-2 rounded"
            autoComplete="current-password"
          />
        </label>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">New Password</span>
          <input
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="New password"
            className="border-2 p-2 rounded"
            autoComplete="new-password"
          />
        </label>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">Confirm New Password</span>
          <input
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            className="border-2 p-2 rounded"
            autoComplete="new-password"
          />
        </label>

        <button
          type="submit"
          className="bg-amber-200 hover:bg-amber-300 px-5 py-2 rounded font-semibold transition"
        >
          Update Settings
        </button>

        <Link
          to="/"
          className="italic text-sm text-gray-600 hover:underline"
        >
          Back to Home
        </Link>
      </form>

      {/* Footer */}
      <footer className="flex justify-end mt-10 text-sm text-gray-600">
        <span className="font-semibold flex gap-2 items-center">
          Made with <FcCloseUpMode /> by @anuragrajpoott
        </span>
      </footer>
    </div>
  );
};

export default Settings;
