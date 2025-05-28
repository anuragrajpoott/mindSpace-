import React, { useState, useRef, useEffect } from "react";
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
import { logout } from "../services/operations/authOperations";

const Nav = () => {
  const user = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10" />
          <span className="font-bold text-xl text-blue-800">Mind Space +</span>
        </Link>

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
                  isActive ? "text-blue-700 font-semibold" : "text-gray-700"
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </div>

        {/* Search + Profile */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="flex items-center border rounded-md px-2">
            <FcSearch className="cursor-pointer" onClick={handleSearch} />
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
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl border"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="Toggle profile menu"
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <FcPortraitMode />
              )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
                role="menu"
              >
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FcPortraitMode /> My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <FcLock /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
