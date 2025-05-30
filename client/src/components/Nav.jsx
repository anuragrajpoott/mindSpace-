import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/userOperations";

const Nav = () => {


  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout(navigate));
    setDropdownOpen(false);

  };

  const handleSearch = () => {
    console.log("Searching for:", search);
    // Add your search logic here or dispatch action
  };

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
    <nav
      className="bg-white shadow-md px-6 py-4 sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Home">
          <img src={logo} alt="Mind Space + logo" className="h-10" />
          <span className="font-bold text-xl text-blue-800">Mind Space +</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center flex-wrap text-base">
          {[
            { to: "/", icon: <FcHome />, label: "Home" },
            { to: "/groups", icon: <FcReading />, label: "groups" },
            { to: "/mood-log", icon: <FcLike />, label: "mood-log" },
            { to: "/resources", icon: <FcMindMap size={20} />, label: "resources" },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1 hover:text-blue-600 ${
                  isActive ? "text-blue-700 font-semibold" : "text-gray-700"
                }`
              }
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              {icon} {label}
            </NavLink>
          ))}
        </div>

        {/* Search + Profile */}
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="flex items-center border rounded-md px-2">
            <FcSearch
              className="cursor-pointer"
              onClick={handleSearch}
              role="button"
              tabIndex={0}
              aria-label="Submit search"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl border"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="Toggle profile menu"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setDropdownOpen((prev) => !prev);
                }
              }}
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <FcPortraitMode />
              )}
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
                role="menu"
                aria-label="Profile options"
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
