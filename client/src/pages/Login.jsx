import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/operations/authOperations";
import logo from "../assets/images/logo.png";
import { FcCloseUpMode } from "react-icons/fc";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { userName, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData, navigate));
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
      >
        <h2 className="text-3xl font-semibold mb-6 text-amber-600">Welcome Back!</h2>

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
            placeholder="Enter your username"
          />
        </label>

        <label className="flex flex-col w-full text-left relative">
          <span className="mb-1 font-medium">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="border-2 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 transition pr-12"
            autoComplete="current-password"
            aria-label="Password"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-8 text-amber-600 hover:text-amber-800 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>

          <Link
            to="/forgot-password"
            className="self-end mt-2 italic text-sm text-blue-600 hover:underline"
            aria-label="Forgot password link"
          >
            Forgot Password?
          </Link>
        </label>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="text-red-600 font-semibold bg-red-100 p-2 rounded w-full text-center"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className="bg-amber-200 hover:bg-amber-300 px-6 py-3 rounded font-semibold transition disabled:opacity-50 w-full"
          disabled={loading}
          aria-busy={loading}
          aria-label="Log in"
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
