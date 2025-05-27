import React, { useState } from 'react'
import logo from "../assets/images/logo.png"
import { FcCloseUpMode } from "react-icons/fc"
import { Link } from 'react-router-dom' // ✅ Correct import
import { useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router'
import { logIn } from '../services/operations'

const Login = () => {
const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  });

  const { userName, password } = formData;

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);
    // Add API call or validation logic here
    dispatch(logIn(formData,navigate))
        setFormData({
          userName:"",
          password:""
        })
  };

  return (
    <div className='flex flex-col justify-between min-h-screen p-10'>

      {/* Header */}
      <Link to={"/"}>
            <div className='flex items-center gap-2.5'>
              <img src={logo} alt='logo' className='h-10' />
              <span className='font-bold text-xl'>Mind Space +</span>
            </div>
            </Link>

      {/* Login Form */}
      <form
        className='flex flex-col items-center justify-center gap-5'
        onSubmit={submitHandler}
      >
        <span className='text-2xl font-semibold'>Welcome Back!</span>

        <label className='flex flex-col text-left w-[300px]'>
          <p className='mb-1'>Username</p>
          <input
            required
            type='text'
            name="userName"
            value={userName}
            onChange={changeHandler}
            className='border-2 p-2 rounded'
          />
        </label>

        <label className='flex flex-col text-left w-[300px]'>
          <p className='mb-1'>Password</p>
          <input
            required
            type='password'
            name="password"
            value={password}
            onChange={changeHandler}
            className='border-2 p-2 rounded'
          />
          <Link to={"/forgot-password"} className='self-end mt-1 italic text-sm text-blue-600 hover:underline'>
            Forgot Password?
          </Link>
        </label>

        <button
          type='submit'
          className='bg-amber-200 hover:bg-amber-300 px-5 py-2 rounded font-semibold'
        >
          Log In
        </button>

        <Link to={"/sign-up"} className='italic text-sm text-gray-600 hover:underline'>
          Don’t have an account?
        </Link>
      </form>

      {/* Footer */}
      <div className='flex justify-end mt-10 text-sm text-gray-600'>
        <span className='font-semibold flex gap-2 items-center'>
          Made with <FcCloseUpMode /> by @anuragrajpoott
        </span>
      </div>
    </div>
  )
}

export default Login
