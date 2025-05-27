import React, { useState } from 'react'
import logo from "../assets/images/logo.png"
import { FcCloseUpMode } from "react-icons/fc"
import { Link } from 'react-router-dom' // ✅ fixed import
import { useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router'
import {  signUp } from '../services/operations'

const Signup = () => {

    const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: ""
  });

  const { userName, password, confirmPassword } = formData;

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Signing up with:", formData);
    // Call signup API or backend here
    dispatch(signUp(formData,navigate))
      setFormData({
        userName:"",
        password:"",
        confirmPassword:""
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

      {/* Signup Form */}
      <form className='flex flex-col items-center justify-center gap-5' onSubmit={submitHandler}>

        <span className='text-2xl font-semibold'>Start Your Journey!</span>

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
        </label>

        <label className='flex flex-col text-left w-[300px]'>
          <p className='mb-1'>Confirm Password</p>
          <input
            required
            type='password'
            name="confirmPassword"
            value={confirmPassword}
            onChange={changeHandler}
            className='border-2 p-2 rounded'
          />
        </label>

        <button
          type='submit'
          className='bg-amber-200 hover:bg-amber-300 px-5 py-2 rounded font-semibold'
        >
          Sign Up
        </button>

        <Link to={"/log-in"} className='italic text-sm text-gray-600 hover:underline'>
          Already registered? Log in
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

export default Signup
