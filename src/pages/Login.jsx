import React, { useState } from 'react'
import authService from '../Firebase/auth'
import { login as authLogin, logout, checkAdmin } from '../store/authSlice'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import service from '../Firebase/conf'
import { serverTimestamp } from 'firebase/firestore'
import { Loading } from '../components'


function Login() {

  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [success, setSuccess] = useState("")
const dispatch = useDispatch()
const navigate = useNavigate()

  // login handler email/password
  const handleLogin = async() => {
    if(email === "" || password === ""){
      setSuccess('')
      setError('Kindly fill required fields!!')
    } else{
      setError("")
      setLoading(true)
      try {
        const session = await authService.login({email: email, password: password})
        .then(async(user) => {

          await service.getUserDocs({uid: user.user.uid})
        .then((data) =>{ if(data.data().isAdmin === true){
          dispatch(checkAdmin())
        }})
        .catch((e)=> console.log(e))

              setLoading(false)
              setSuccess('Success!! you are logged in');
              setError('');
              dispatch (authLogin(user));
              navigate("/");
           
           
        })
      
      } catch (error) {
            setSuccess('')
            setError(error.code)
            setLoading(false)
            console.log(error.code);
           
          }
    }
  }

  //login with google handler
    const handleGoogleSignIn = async () => {
      setGoogleLoading(true)
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
        setGoogleLoading(false)
      } catch (error) {
        setSuccess('')
        setGoogleLoading(false)
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

            {/* email input */}
            <li className=' mt-2'>
              <label htmlFor="email" className=' font-bold'>Email:</label>
              <input type="email" id = "email" placeholder='Email'
              className=' w-full px-2 py-1 text-black rounded-md border-[3px] border-gray-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </li>

            {/* password input */}
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

              {/* login btn */}
            <button className=' flex justify-center items-center w-full text-white bg-indigo-400 text-lg rounded-md border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400 font-semibold'
            onClick={handleLogin}
            >
              Login
              <Loading className={`${loading? 'block': 'hidden'} mx-2`}/>
              
              </button>
            </li>
            <li className=' flex flex-col items-center justify-center'>
            <div className=" text-gray-400 text-[15px]"> ------------OR------------</div>

            {/* google login btn */}
            <button className=' flex justify-center items-center bg-blue-400 w-full text-lg text-white font-semibold rounded-md border-[3px] border-blue-300 hover'
            onClick={handleGoogleSignIn}
            >Login With Google
             <Loading className={`${googleLoading? 'block': 'hidden'} mx-2`}/>
            </button>
            </li>
          </ul>
        
         </div>
        </div>
      </div>
    </>
  )
}

export default Login
