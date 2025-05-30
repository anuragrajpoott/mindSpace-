import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../services/operations/userOperations";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error: reduxError } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const { fullName, userName, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName.trim() || !fullName.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }

    // Dispatch Redux thunk for signup
    dispatch(signUp(formData,navigate));
    console.log(formData)
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-10 bg-blue-100 text-lg">
      <Link to="/" className="flex items-center gap-2.5 mb-10" aria-label="Go to Home">
        <img src={logo} alt="Mind Space Plus logo" className="h-10" />
        <span className="font-bold text-xl">Mind Space +</span>
      </Link>

      <form
        className="flex flex-col items-center justify-center gap-6 max-w-md mx-auto w-full bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        aria-label="Sign up form"
      >
        <h2 className="text-3xl font-semibold mb-6 text-amber-600">Start Your Journey!</h2>

        <label className="flex flex-col w-full text-left">
          <span className="mb-1 font-medium">Username</span>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
            required
            className="border-2 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            autoComplete="username"
            aria-label="Username"
            placeholder="Choose a username"
            autoFocus
          />
        </label>

        <label className="flex flex-col w-full text-left">
          <span className="mb-1 font-medium">Full Name</span>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            required
            className="border-2 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            autoComplete="name"
            aria-label="Full Name"
            placeholder="Enter your full name"
          />
        </label>

        <label className="flex flex-col w-full text-left">
          <span className="mb-1 font-medium">Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="border-2 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            autoComplete="new-password"
            aria-label="Password"
            placeholder="Enter your password"
          />
        </label>

        <label className="flex flex-col w-full text-left">
          <span className="mb-1 font-medium">Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            className="border-2 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            autoComplete="new-password"
            aria-label="Confirm Password"
            placeholder="Confirm your password"
          />
        </label>

        {(error || reduxError) && (
          <div
            role="alert"
            className="text-red-600 font-semibold bg-red-100 p-2 rounded w-full text-center"
          >
            {error || reduxError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-amber-400 cursor-not-allowed" : "bg-amber-200 hover:bg-amber-300"
          } px-6 py-3 rounded font-semibold transition w-full`}
          aria-label="Sign up"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <Link
          to="/log-in"
          className="italic text-sm text-gray-600 hover:underline mt-3"
          aria-label="Log in link"
        >
          Already registered? Log in
        </Link>
      </form>

      <footer className="flex justify-end mt-10 text-sm text-gray-600" aria-label="Footer">
        <span className="font-semibold flex gap-2 items-center">
          Made with <span role="img" aria-hidden="true">🔍</span> by @anuragrajpoott
        </span>
      </footer>
    </div>
  );
};

export default Signup;
