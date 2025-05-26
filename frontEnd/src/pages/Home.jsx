import React from 'react'
import logo from "../assets/images/logo.png"
import home from "../assets/images/home.png"
import { Link } from 'react-router'
import { FcCloseUpMode } from "react-icons/fc";


const Home = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>

      <div className='flex items-center gap-2.5'>
        <img src={logo} alt='logo' className='h-10' />
        <span className='font-bold'>Mind Space +</span>
      </div>

      <div className='flex'>
        <div className='flex flex-col gap-10 items-center justify-center w-[50%]'>
          <span className='font-bold'>Welcome to Mind Space +</span>
          <span className='italic'>Share your journey, connect with others, and find resources to help you thrive during you extraa hours.</span>
          <div className='flex gap-5'>
            <Link to={"/Log-in"}><button className='p-2.5 bg-amber-100 rounded-lg'>Continue Journey</button></Link>
            <Link to={"/sign-up"}><button className='p-2.5 bg-amber-100 rounded-lg'>Start Journey</button></Link>
          </div>
        </div>
        <div className='w-[50%]'><img src={home} alt='' /></div>
      </div>

      <div className='flex justify-end'>
      <span className='font-bold flex gap-2.5 items-center'>made with <FcCloseUpMode /> @anuragrajpoott</span>
      </div>

    </div>
  )
}

export default Home
