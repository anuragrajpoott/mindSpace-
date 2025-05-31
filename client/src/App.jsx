import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Feed from "./pages/Feed.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Group from "./pages/Group.jsx";
import Resource from "./pages/Resource.jsx";
import MoodLog from "./pages/MoodLog.jsx";

// PrivateRoute component to protect routes
const PrivateRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/log-in" replace />;
  }
  return children;
};

const App = () => {
  const { token, loading } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-amber-50 p-4 min-h-screen text-gray-900 font-sans">
      {token && <Nav />}

      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={token ? <Navigate to="/feed" replace /> : <Home />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/feed" replace /> : <Signup />}
        />
        <Route
          path="/log-in"
          element={token ? <Navigate to="/feed" replace /> : <Login />}
        />

        {/* Protected routes */}
        <Route
          path="/feed"
          element={
            <PrivateRoute token={token}>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <PrivateRoute token={token}>
              <Group />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute token={token}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <PrivateRoute token={token}>
              <Resource />
            </PrivateRoute>
          }
        />
        <Route
          path="/mood-log"
          element={
            <PrivateRoute token={token}>
              <MoodLog />
            </PrivateRoute>
          }
        />

        {/* Catch all unknown routes */}
        <Route
          path="*"
          element={
            token ? (
              <Navigate to="/feed" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
