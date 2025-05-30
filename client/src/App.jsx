import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Feed from "./pages/Feed.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Group from "./pages/Group.jsx";
import Resource from "./pages/Resource.jsx";
import MoodLog from "./pages/MoodLog.jsx";
import { useSelector } from "react-redux"

const App = () => {

  const { token, loading } = useSelector((state) => state.user)


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-amber-50 p-4 min-h-screen text-gray-900 font-sans">


      {token ? (
        <>
        <Nav/>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/groups" element={<Group />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resources" element={<Resource />} />
            <Route path="/mood-log" element={<MoodLog />} />

          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/log-in" element={<Login />} />
            </Routes>
          </>

        )}
          
        
    </div>
  );
};

export default App;
