import React, { useState } from 'react'
import Home from './pages/Home.jsx'
import { Route, Routes } from 'react-router'
import Feed from "./pages/Feed.jsx"

const App = () => {

  const [isLogin, setIsLogin] = useState(false)

  const [loading, setLoading] = useState(false)

  return (
    <div className=''>

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

              </Routes>
            </div>)
          }
        </div>)
      }

    </div>
  )
}

export default App
