import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./redux/Slices/authSlice";

import Home from "./pages/Home.jsx";
import Feed from "./pages/Feed.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Nav from "./components/Nav.jsx";
import Messages from "./pages/Messages.jsx";
import Notifications from "./pages/Notifications.jsx";
import Support from "./pages/Support.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Settings from "./pages/Settings.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-gray-700">
    Loading...
  </div>
);

const PrivateRoutes = () => (
  <>
    <Nav />
    <Routes>
      <Route path="/feed" element={<Feed />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/support" element={<Support />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/feed" replace />} />
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/reset-password" element={<ResetPassword/>}/>


    </Routes>
  </>
);

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/log-in" element={<Login />} />
    <Route path="/sign-up" element={<Signup />} />
    <Route path="*" element={<Navigate to="/" replace />} />
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
  </Routes>
);

const App = () => {
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const localToken = JSON.parse(localStorage.getItem("token"));
      if (localToken) {
        dispatch(setToken(localToken));
      }
    } catch (err) {
      console.warn("Failed to parse token from localStorage", err);
    }
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="bg-amber-50 p-4 min-h-screen text-gray-900 font-sans">
      {token ? <PrivateRoutes /> : <PublicRoutes />}
    </div>
  );
};

export default App;
