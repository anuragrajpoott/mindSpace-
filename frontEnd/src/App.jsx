import React, { useState } from 'react'
import Home from './pages/Home.jsx'
import { Route, Routes } from 'react-router'
import Feed from "./pages/Feed.jsx"
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { useSelector } from 'react-redux'
import Nav from './components/Nav.jsx'
import Messages from './pages/Messages.jsx';
import Notifications from './pages/Notifications.jsx';
import Support from './pages/Support.jsx';
import Profile from './pages/Profile.jsx';

const App = () => {

  const {user, loading} = useSelector((state)=>state.slice) 

  return (
    <div className='bg-blue-100 p-10 min-h-screen text-2xl'>

      {
        loading ? (<div>Loading...</div>) : (<div>
          {
            user ? (<div>

              <Nav/>

              <Routes>

                <Route path='/feed' element={<Feed/>} />

               <Route path="/messages" element={<Messages />} />

            <Route path="/notifications" element={<Notifications />} />

            <Route path="/support" element={<Support />} />

            <Route path="/profile" element={<Profile />} />

              </Routes>

            </div>) : (<div>

              

              <Routes>

                <Route path={"/"} element={<Home/>} />

                <Route path={"/log-in"} element={<Login/>} />

                <Route path={"/sign-up"} element={<Signup/>} />

              </Routes>
            </div>)
          }
        </div>)
      }

    </div>
  )
}

export default App
