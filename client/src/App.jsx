import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home.jsx';
import Feed from './pages/Feed.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Nav from './components/Nav.jsx';
import Messages from './pages/Messages.jsx';
import Notifications from './pages/Notifications.jsx';
import Support from './pages/Support.jsx';
import Profile from './pages/Profile.jsx';

const App = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-2xl">Loading...</div>;
  }

  return (
    <div className="bg-blue-100 p-10 min-h-screen text-2xl">
      {user ? (
        <>
          <Nav />
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />

            {/* Redirect unknown routes to /feed */}
            <Route path="*" element={<Navigate to="/feed" replace />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
