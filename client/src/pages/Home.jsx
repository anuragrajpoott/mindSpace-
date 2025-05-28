import React from "react";
import logo from "../assets/images/logo.png";
import home from "../assets/images/home.png";
import { Link } from "react-router-dom";
import { FcCloseUpMode } from "react-icons/fc";

const Home = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen p-10">
      {/* Logo and Title */}
      <header role="banner">
        <Link to="/" aria-label="Go to Home">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <img src={logo} alt="Mind Space Plus logo" className="h-10" />
            <span className="font-bold text-xl">Mind Space +</span>
          </div>
        </Link>
      </header>

      {/* Main Welcome Section */}
      <main role="main" className="flex flex-col lg:flex-row items-center mt-10 gap-10">
        {/* Left - Text */}
        <section
          className="flex flex-col gap-10 items-center justify-center w-full lg:w-1/2 text-center lg:text-left"
          aria-label="Welcome message and navigation"
        >
          <h1 className="font-bold text-3xl">Welcome to Mind Space +</h1>
          <p className="italic text-lg text-gray-700 max-w-md">
            Share your journey, connect with others, and find resources to help you thrive during your extra hours.
          </p>
          <div className="flex gap-5">
            <Link to="/log-in" aria-label="Continue Journey - Log In">
              <button
                className="p-3 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-md transition"
                type="button"
              >
                Continue Journey
              </button>
            </Link>
            <Link to="/sign-up" aria-label="Start Journey - Sign Up">
              <button
                className="p-3 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-md transition"
                type="button"
              >
                Start Journey
              </button>
            </Link>
          </div>
        </section>

        {/* Right - Image */}
        <section className="w-full lg:w-1/2" aria-label="Welcome illustration">
          <img
            src={home}
            alt="Illustration welcoming users to Mind Space Plus"
            className="w-full max-h-[400px] object-contain"
            loading="lazy"
          />
        </section>
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="flex justify-end mt-10 text-sm text-gray-600" aria-label="Footer">
        <span className="font-semibold flex gap-2 items-center">
          Made with <FcCloseUpMode aria-hidden="true" /> by @anuragrajpoott
        </span>
      </footer>
    </div>
  );
};

export default Home;
