import React, { useState } from 'react';
import logo from "../assets/images/logo.png";
import { Link, NavLink } from 'react-router-dom';
import {
  FcHome, FcReading, FcLike, FcPortraitMode,
  FcSearch, FcLock, FcMindMap
} from "react-icons/fc";
import { useSelector } from 'react-redux';

const Nav = () => {
  const { user } = useSelector((state) => state.slice); // Adjust as per your store
  const [search, setSearch] = useState("");

  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-10" />
          <span className="font-bold text-xl text-blue-800">Supportify+</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center flex-wrap text-base">
          <NavLink to="/feed" className="flex items-center gap-1 hover:text-blue-600">
            <FcHome /> Home
          </NavLink>
          <NavLink to="/messages" className="flex items-center gap-1 hover:text-blue-600">
            <FcReading /> Messages
          </NavLink>
          <NavLink to="/support" className="flex items-center gap-1 hover:text-blue-600">
            <FcLike /> Support
          </NavLink>
          <NavLink to="/notifications" className="flex items-center gap-1 hover:text-blue-600">
            <FcMindMap size={20} /> Notifications
          </NavLink>
        </div>

        {/* Search + Profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md px-2">
            <FcSearch />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none px-2 py-1 w-40"
            />
          </div>

          {/* Profile Dropdown */}
          <div className="relative group cursor-pointer">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="profile" className="h-10 w-10 rounded-full object-cover border" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                <FcPortraitMode />
              </div>
            )}

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-10">
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FcPortraitMode /> My Profile
              </Link>
              <Link to="/logout" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <FcLock /> Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
