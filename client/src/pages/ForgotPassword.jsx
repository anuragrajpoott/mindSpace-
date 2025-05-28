import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/operations/authOperations";
import logo from "../assets/images/logo.png";
import { FcCloseUpMode } from "react-icons/fc";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // success or error message
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await dispatch(forgotPassword({ email })).unwrap();
      setMessage("Reset link sent! Check your email.");
      setEmail("");
    } catch (err) {
      setError(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen p-10">
      {/* Header */}
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logo} alt="logo" className="h-10" />
        <span className="font-bold text-xl">Mind Space +</span>
      </Link>

      {/* Forgot Password Form */}
      <form
        className="flex flex-col items-center justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold">Forgot Password?</h2>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">Enter your registered email</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className="border-2 p-2 rounded"
            autoComplete="email"
            disabled={loading}
          />
        </label>

        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}

        <button
          type="submit"
          className={`bg-amber-200 hover:bg-amber-300 px-5 py-2 rounded font-semibold transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <Link
          to="/log-in"
          className="italic text-sm text-gray-600 hover:underline"
        >
          Back to Log In
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

export default ForgotPassword;
