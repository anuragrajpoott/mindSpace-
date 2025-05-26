import React, { useState } from 'react'
import Home from './pages/Home.jsx'
import { Route, Routes } from 'react-router'
import Feed from "./pages/Feed.jsx"
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

const App = () => {

  const [isLogin, setIsLogin] = useState(false)

  const [loading, setLoading] = useState(false)

  return (
    <div className='bg-blue-100 p-10 min-h-screen text-2xl'>

      {
        loading ? (<div>Loading...</div>) : (<div>
          {
            isLogin ? (<div>

              <Routes>

                <Route path='/feed' element={<Feed />} />

              </Routes>

            </div>) : (<div>

              <Routes>

                <Route path={"/"} element={<Home />} />

                <Route path={"/log-in"} element={<Login />} />

                <Route path={"/sign-up"} element={<Signup />} />

              </Routes>
            </div>)
          }
        </div>)
      }

    </div>
  )
}

export default App
