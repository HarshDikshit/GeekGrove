import { faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import authService from '../Firebase/auth'
import { login as authLogin, logout } from '../store/authSlice'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import service from '../Firebase/conf'

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [success, setSuccess] = useState("")
const dispatch = useDispatch()
const navigate = useNavigate()


  const handleLogin = async() => {
    if(email === "" || password === ""){
      setSuccess('')
      setError('Kindly fill required fields!!')
    } else{
      setError("")
      try {
        const session = await authService.login({email, password}).then(async(user) => {
        
          setSuccess('Success!! you are logged in')
          setError('')
       
            // const usData = {
            //   email: email,
            //   password: password
            // }
            // await service.createDoc('user' , {email: email,password: password }).then().finally()
          
          
          dispatch (authLogin(user.user))
          navigate("/")
        })
      
      } catch (error) {
      setSuccess('')
       setError(error.code)
      console.log(error);
      }
    
    }
  }
    const handleGoogleSignIn = async () => {
      try {
        const session = await authService.googleSignUp().then((user) => {
          setError('')
          setSuccess('Success!! you are logged in')
          
          dispatch (authLogin(user))
          navigate("/")
        }).catch((e)=> {
          setSuccess('')
        setError(e.code)
        })

      } catch (error) {
        setSuccess('')
        setError(error.code)
      }
    }
  
  return (
    <>
      <div className=" w-full  flex justify-center items-center  py-5">

        {/* form goes here */}
        <div className=" lg:w-[30%] w-[90%]  sm:w-[50%] justify-center shadow-sm shadow-black rounded-md">
         {/* form elements goes here */}
         <div className=" w-full flex flex-col justify-center py-2 items-center">

          {/* heading goes here */}
          <h1 className=' uppercase font-bold text-2xl '>Login</h1>
          {/* error */}

          <div className= {`${error? 'block' : 'hidden'} flex justify-center text-red-700 bg-red-200 rounded-md border-[2px] border-red-300 mb-2`}>
    {error!== "" && error} </div>

    {/* success */}
    <div className={`${success? "block": "hidden"} flex justify-center text-green-700 bg-green-200 rounded-md border-[2px] border-green-300 mb-2`}>
    {success !== "" && success}
    </div>

    {/* elements */}
          <ul>
            <li className=' mt-2'>
              <label htmlFor="email" className=' font-bold'>Email:</label>
              <input type="email" id = "email" placeholder='Email'
              className=' w-full px-2 py-1 text-black rounded-md border-[3px] border-gray-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </li>
            <li className=' mt-2'>
              <label htmlFor="password" className=' font-bold'>Password:</label>
              <div className="">
              <input type="password" id = "password" placeholder='Password'
              className=' w-full px-2 py-1 text-black rounded-md border-[3px] border-gray-500'
              value={password}
             onChange={(e) => setPassword(e.target.value)}
              />
             
              </div>
            </li>
          
            <li className=' mt-4'>
            <button className=' w-full text-white bg-indigo-400 text-lg rounded-md border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400 font-semibold'
            onClick={handleLogin}
            >Submit</button>
            </li>
            <li className=' flex flex-col items-center justify-center'>
            <div className=" text-gray-400 text-[15px]"> ------------OR------------</div>
            <button className=' bg-blue-400 w-full text-lg text-white font-semibold rounded-md border-[3px] border-blue-300 hover'
            onClick={handleGoogleSignIn}
            >Login With Google</button>
            </li>
          </ul>
        
         </div>
        </div>
      </div>
    </>
  )
}

export default Login
