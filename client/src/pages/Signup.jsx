import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/operations/authOperations";
import logo from "../assets/images/logo.png";
import { FcCloseUpMode } from "react-icons/fc";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const { userName, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(register({ userName, password }, navigate));
    // Note: We send only userName & password to backend, confirmPassword is frontend validation only
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-10">
      {/* Header */}
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logo} alt="logo" className="h-10" />
        <span className="font-bold text-xl">Mind Space +</span>
      </Link>

      {/* Signup Form */}
      <form
        className="flex flex-col items-center justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold">Start Your Journey!</h2>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">Username</span>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
            required
            className="border-2 p-2 rounded"
            autoComplete="username"
          />
        </label>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="border-2 p-2 rounded"
            autoComplete="new-password"
          />
        </label>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            className="border-2 p-2 rounded"
            autoComplete="new-password"
          />
        </label>

        <button
          type="submit"
          className="bg-amber-200 hover:bg-amber-300 px-5 py-2 rounded font-semibold transition"
        >
          Sign Up
        </button>

        <Link
          to="/log-in"
          className="italic text-sm text-gray-600 hover:underline"
        >
          Already registered? Log in
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

export default Signup;
