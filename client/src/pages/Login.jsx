import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FcCloseUpMode } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/userOperations";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userName, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null); // clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Assuming login returns a promise and throws on failure
      await dispatch(login(formData, navigate));
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-10 bg-blue-100 text-lg">
      {/* Header */}
      <Link to="/" className="flex items-center gap-2.5 mb-10" aria-label="Go to Home">
        <img src={logo} alt="Mind Space Plus logo" className="h-10" />
        <span className="font-bold text-xl">Mind Space +</span>
      </Link>

      {/* Login Form */}
      <form
        className="flex flex-col items-center justify-center gap-6 max-w-md mx-auto w-full bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        aria-label="Login form"
        noValidate
      >
        <h2 className="text-3xl font-semibold mb-6 text-amber-600">Welcome Back!</h2>

        {error && (
          <div role="alert" className="text-red-600 font-medium mb-4" aria-live="assertive">
            {error}
          </div>
        )}

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
            placeholder="Enter your username"
            autoFocus
            disabled={loading}
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
            autoComplete="current-password"
            placeholder="Enter your password"
            disabled={loading}
          />

          <Link
            to="/forgot-password"
            className="self-end mt-2 italic text-sm text-blue-600 hover:underline"
            aria-label="Forgot password link"
          >
            Forgot Password?
          </Link>
        </label>

        <button
          type="submit"
          className="bg-amber-200 hover:bg-amber-300 px-6 py-3 rounded font-semibold transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Log in"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <Link
          to="/sign-up"
          className="italic text-sm text-gray-600 hover:underline mt-3"
          aria-label="Sign up link"
        >
          Don’t have an account?
        </Link>
      </form>

      {/* Footer */}
      <footer className="flex justify-end mt-10 text-sm text-gray-600" aria-label="Footer">
        <span className="font-semibold flex gap-2 items-center">
          Made with <FcCloseUpMode aria-hidden="true" /> by @anuragrajpoott
        </span>
      </footer>
    </div>
  );
};

export default Login;
