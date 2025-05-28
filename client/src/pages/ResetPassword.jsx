import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authOperations";
import logo from "../assets/images/logo.png";
import { FcCloseUpMode } from "react-icons/fc";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams(); // reset token from URL

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(""); // clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      // Assuming resetPassword returns a thunk with unwrap()
      await dispatch(resetPassword({ token, password })).unwrap();
      // On success navigate to login page
      navigate("/log-in");
    } catch (err) {
      setError(err.message || "Failed to reset password");
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

      {/* Reset Password Form */}
      <form
        className="flex flex-col items-center justify-center gap-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold">Reset Your Password</h2>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">New Password</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="border-2 p-2 rounded"
            autoComplete="new-password"
            minLength={6}
            disabled={loading}
          />
        </label>

        <label className="flex flex-col w-[300px] text-left">
          <span className="mb-1">Confirm New Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            className="border-2 p-2 rounded"
            autoComplete="new-password"
            minLength={6}
            disabled={loading}
          />
        </label>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className={`bg-amber-200 hover:bg-amber-300 px-5 py-2 rounded font-semibold transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
