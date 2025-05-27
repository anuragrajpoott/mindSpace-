import React from "react";
import logo from "../assets/images/logo.png";
import home from "../assets/images/home.png";
import { Link } from "react-router-dom";
import { FcCloseUpMode } from "react-icons/fc";

const Home = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen p-10">
      {/* Logo and Title */}
      <Link to="/" aria-label="Go to Home">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <img src={logo} alt="Mind Space Plus logo" className="h-10" />
          <span className="font-bold text-xl">Mind Space +</span>
        </div>
      </Link>

      {/* Main Welcome Section */}
      <div className="flex flex-col lg:flex-row items-center mt-10 gap-10">
        {/* Left - Text */}
        <div className="flex flex-col gap-10 items-center justify-center w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="font-bold text-3xl">Welcome to Mind Space +</h1>
          <p className="italic text-lg text-gray-700 max-w-md">
            Share your journey, connect with others, and find resources to help you thrive during your extra hours.
          </p>
          <div className="flex gap-5">
            <Link to="/log-in">
              <button
                className="p-3 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-md"
                aria-label="Continue Journey - Log In"
              >
                Continue Journey
              </button>
            </Link>
            <Link to="/sign-up">
              <button
                className="p-3 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-md"
                aria-label="Start Journey - Sign Up"
              >
                Start Journey
              </button>
            </Link>
          </div>
        </div>

        {/* Right - Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={home}
            alt="Illustration welcoming users to Mind Space Plus"
            className="w-full max-h-[400px] object-contain"
            loading="lazy"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-end mt-10 text-sm text-gray-600" aria-label="Footer">
        <span className="font-semibold flex gap-2 items-center">
          Made with <FcCloseUpMode aria-hidden="true" /> by @anuragrajpoott
        </span>
      </footer>
    </div>
  );
};

export default Home;
