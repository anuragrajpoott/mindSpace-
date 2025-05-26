import React from 'react'
import logo from "../assets/images/logo.png"
import home from "../assets/images/home.png"
import { Link } from 'react-router-dom' // ✅ Correct package
import { FcCloseUpMode } from "react-icons/fc"

const Home = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen p-10'>

      {/* Logo and Title */}
      <Link to={"/"}>
      <div className='flex items-center gap-2.5'>
        <img src={logo} alt='logo' className='h-10' />
        <span className='font-bold text-xl'>Mind Space +</span>
      </div>
      </Link>

      {/* Main Welcome Section */}
      <div className='flex flex-col lg:flex-row items-center mt-10 gap-10'>

        {/* Left - Text */}
        <div className='flex flex-col gap-10 items-center justify-center w-full lg:w-[50%] text-center lg:text-left'>
          <span className='font-bold text-3xl'>Welcome to Mind Space +</span>
          <span className='italic text-lg text-gray-700'>
            Share your journey, connect with others, and find resources to help you thrive during your extra hours.
          </span>
          <div className='flex gap-5'>
            <Link to={"/log-in"}>
              <button className='p-3 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-md'>
                Continue Journey
              </button>
            </Link>
            <Link to={"/sign-up"}>
              <button className='p-3 bg-amber-100 hover:bg-amber-200 rounded-lg shadow-md'>
                Start Journey
              </button>
            </Link>
          </div>
        </div>

        {/* Right - Image */}
        <div className='w-full lg:w-[50%]'>
          <img src={home} alt='welcome visual' className='w-full max-h-[400px] object-contain' />
        </div>

      </div>

      {/* Footer */}
      <div className='flex justify-end mt-10 text-sm text-gray-600'>
        <span className='font-semibold flex gap-2 items-center'>
          Made with <FcCloseUpMode /> by @anuragrajpoott
        </span>
      </div>

    </div>
  )
}

export default Home
