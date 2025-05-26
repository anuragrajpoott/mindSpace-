import {  axiosConnector } from "./axios";
import { endPoints } from "./apis";
import toast from "react-hot-toast";
import { setLoading, setUser } from "../redux/slice";


const {
    SIGNUP_API, LOGIN_API
} = endPoints


export function signUp(formData,navigate) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {

        const res = await axiosConnector("POST", SIGNUP_API,formData)
 
        if (!res.data.success) {
          console.log(res.data.message)
          throw new Error(res.data.error)
        }

        toast.success("Signup Successful")
        dispatch(setUser(res.data.newUser))
        
        localStorage.setItem("user",JSON.stringify(res.data.newUser))
        
        navigate("/feed")
        

      } catch (error) {

        console.log("SIGNUP API ERROR...")
        console.log(error)
        
        toast.error("Sign Up Failed")
        navigate("/sign-up")

      }
      dispatch(setLoading(false))
    }
  }


  export function logIn(formData,navigate) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const res = await axiosConnector("POST", LOGIN_API, formData)

        console.log(res)
 
        if (!res.data.success) {
          console.log(res.data.message)
          throw new Error(res.data.error)
        }

        toast.success("Log In Successful")
        dispatch(setUser(res.data.existingUser))
       
        localStorage.setItem("user",JSON.stringify(res.data.existingUser))
        
        navigate("/feed")

      } catch (error) {

        console.log("LOGIN API ERROR...")
        console.log(error)

        toast.error("Log In Failed")
        navigate("/log-in")

      }
      dispatch(setLoading(false))
    }
  }

