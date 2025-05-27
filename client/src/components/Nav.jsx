import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FcHome,
  FcReading,
  FcLike,
  FcPortraitMode,
  FcSearch,
  FcLock,
  FcMindMap,
} from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Slices/authSlice"; // adjust path as needed

const Nav = () => {
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10" />
          <span className="font-bold text-xl text-blue-800">Mind Space +</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center flex-wrap text-base">
          {[
            { to: "/feed", icon: <FcHome />, label: "Home" },
            { to: "/messages", icon: <FcReading />, label: "Messages" },
            { to: "/support", icon: <FcLike />, label: "Support" },
            { to: "/notifications", icon: <FcMindMap size={20} />, label: "Notifications" },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1 hover:text-blue-600 ${
                  isActive ? "text-blue-700 font-semibold" : ""
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </div>

        {/* Search and Profile */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="flex items-center border rounded-md px-2">
            <FcSearch />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="outline-none px-2 py-1 w-40"
              aria-label="Search"
            />
          </div>

          {/* Profile Dropdown */}
          <div className="relative group cursor-pointer" tabIndex={0} aria-haspopup="true" aria-expanded="false">
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="profile"
                className="h-10 w-10 rounded-full object-cover border"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                <FcPortraitMode />
              </div>
            )}

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-10">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <FcPortraitMode /> My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                aria-label="Logout"
              >
                <FcLock /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
