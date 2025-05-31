import React, { useState, useRef, useEffect, useMemo } from "react";
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

const mockSearchData = [
  { id: 1, type: "user", name: "Alice Johnson" },
  { id: 2, type: "user", name: "Bob Smith" },
  { id: 3, type: "post", title: "Coping with depression tips" },
  { id: 4, type: "post", title: "My mood log for May" },
  { id: 5, type: "group", name: "Support Group A" },
  { id: 6, type: "group", name: "Mental Health Warriors" },
  // Add more mock results here or replace with real API call
];

const Nav = () => {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const { profileImage, name } = user || {};

  const navLinks = useMemo(
    () => [
      { to: "/", icon: <FcHome />, label: "Home" },
      { to: "/groups", icon: <FcReading />, label: "Groups" },
      { to: "/mood-log", icon: <FcLike />, label: "Mood Log" },
      { to: "/resources", icon: <FcMindMap size={20} />, label: "Resources" },
    ],
    []
  );

  // Mock search filter
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setDropdownOpen(false);
      return;
    }
    const results = mockSearchData.filter((item) => {
      const target = item.name || item.title || "";
      return target.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(results);
    setDropdownOpen(results.length > 0);
    setHighlightedIndex(-1);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    performSearch(val);
  };

  const handleSelectResult = (item) => {
    setSearch(item.name || item.title);
    setDropdownOpen(false);

    // Navigate or handle click based on item type
    if (item.type === "user") navigate(`/profile/${item.id}`);
    else if (item.type === "post") navigate(`/post/${item.id}`);
    else if (item.type === "group") navigate(`/groups/${item.id}`);
  };

  // Keyboard navigation in search dropdown
  const handleKeyDown = (e) => {
    if (!dropdownOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelectResult(searchResults[highlightedIndex]);
      } else {
        performSearch(search);
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    setDropdownOpen(false);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus first menu item when profile dropdown opens
  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      const firstMenuItem = dropdownRef.current.querySelector("a, button");
      firstMenuItem?.focus();
    }
  }, [dropdownOpen]);

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
          {navLinks.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
        <div className="flex items-center gap-4 relative">
          {/* Search Box */}
          <div className="flex items-center border rounded-md px-2 relative">
            <FcSearch
              className="cursor-pointer"
              onClick={() => performSearch(search)}
              role="button"
              tabIndex={0}
              aria-label="Submit search"
              onKeyDown={(e) => {
                if (e.key === "Enter") performSearch(search);
              }}
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="outline-none px-2 py-1 w-40"
              aria-label="Search"
              ref={inputRef}
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="search-results"
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
              role="combobox"
            />

            {/* Search Results Dropdown */}
            {dropdownOpen && (
              <ul
                id="search-results"
                role="listbox"
                className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto z-50"
              >
                {searchResults.map((item, idx) => {
                  const isHighlighted = idx === highlightedIndex;
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isHighlighted}
                      tabIndex={-1}
                      className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${
                        isHighlighted ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleSelectResult(item)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                    >
                      {item.type === "user" && (
                        <span>User: {item.name}</span>
                      )}
                      {item.type === "post" && (
                        <span>Post: {item.title}</span>
                      )}
                      {item.type === "group" && (
                        <span>Group: {item.name}</span>
                      )}
                    </li>
                  );
                })}
                {searchResults.length === 0 && (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={name ? `Profile image of ${name}` : "User profile image"}
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
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FcPortraitMode /> My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 w-full text-left"
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
