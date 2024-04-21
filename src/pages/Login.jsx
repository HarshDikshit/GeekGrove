import React, { useState } from 'react'
import authService from '../Firebase/auth'
import { login as authLogin, logout, checkAdmin } from '../store/authSlice'
import {useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import service from '../Firebase/conf'
import { serverTimestamp } from 'firebase/firestore'
import { Loading } from '../components'
import {FaEye, FaEyeSlash} from 'react-icons/fa'


function Login() {

  const [passwordVisible, setPasswordVisible] = useState(false)
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
        .then((data) =>{
          if(data.data().checks.isAdmin === true){
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
        const session = await authService.googleSignUp().then(async(user) => {
          //check field is present
          const check = await service.getUserDocs({uid: user.user.uid})
            if(check._document === null){
              const userDoc =  await service.createUserDoc({
                uid: user.user.uid,
                name: user.user.displayName,
                rollNo: rollNo,
                email: user.user.email,
                createdAt: serverTimestamp() }).then(()=> {
                setSuccess('Success!! you are logged in');
                setError('');
                navigate("/");
              })
              .catch((e)=>{ setError(e.code)
              console.log(e.code);
              })
            }else{
              const userDoc =  await service.updateDoc({
                uid: user.user.uid,
                name: user.user.displayName,
                
                email: user.user.email,
                updatedAt: serverTimestamp() }).then(()=> {
                setSuccess('Success!! you are logged in');
                setError('');
                navigate("/");
              })
              .catch((e)=>{ setError(e.code)
              console.log(e.code);
              })
            }
         
          //check for admin
          await service.getUserDocs({uid: user.user.uid})
        .then((data) =>{
          if(data.data().checks.isAdmin === true){
          dispatch(checkAdmin())
        }
        dispatch (authLogin(data.data()))
      })
        //other tasks
          setError('')
          setSuccess('Success!! you are logged in')
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
      <div className=" w-full  flex justify-center items-center  py-5 dark:bg-slate-600">

        {/* form goes here */}
        <div className=" lg:w-[30%] w-[90%]  sm:w-[50%] justify-center shadow-sm shadow-black rounded-md dark:bg-slate-700">
         {/* form elements goes here */}
         <div className=" w-full flex flex-col justify-center py-2 items-center">

          {/* heading goes here */}
          <h1 className=' uppercase font-bold text-2xl dark:text-slate-300 '>Login</h1>
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
              <label htmlFor="email" className=' font-bold dark:text-slate-300'>Email:</label>
              <input type="email" id = "email" placeholder='Email'
              className=' w-full px-2 py-1 text-black rounded-md border-[3px] border-gray-500
               dark:bg-slate-800 dark:text-slate-300'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </li>

            {/* password input */}
            <li className=' mt-2'>
              <label htmlFor="password" className=' font-bold dark:text-slate-300'>Password:</label>
              <div className=" flex items-center text-black bg-gray-400 rounded-md border-[3px] border-gray-500">
              <input type={passwordVisible? "text" : "password"} id = "password" placeholder='Password'
              className=' w-full px-2 py-1 text-black rounded-md dark:bg-slate-800 dark:text-slate-300 '
              value={password}
             onChange={(e) => setPassword(e.target.value)}
              />
              <div className='' onClick={() => setPasswordVisible(!passwordVisible)}>
                <div className='w-[18px] mx-2'>
                {passwordVisible? (<FaEye/>):(<FaEyeSlash/>)}
                </div>
              {/* <img src={`${!passwordVisible? './logo/hide.png': './logo/view.png'} `} className=' w-[18px] mx-2' alt="" /> */}
              </div>
             
              </div>
            </li>
          
            <li className=' mt-4'>

              {/* login btn */}
            <button className=' flex justify-center items-center w-full text-white bg-indigo-400 text-lg rounded-md border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400 font-semibold mb-5 
          dark:bg-indigo-500 dark:border-indigo-400 dark:hover:bg-indigo-600 dark:hover:border-indigo-500'
            onClick={handleLogin}
            >
              Login
              <Loading className={`${loading? 'block': 'hidden'} mx-2`}/>
              
              </button>
            </li>

            {/* redirect msg here */}
            <li className='flex justify-center items-center'>
              <p className=' text-slate-400 my-2 flex text-sm'>Don't have an account?</p>
              <Link to='/signup' className=' ml-1 text-blue-600 underline text-sm'>Register</Link>
            </li>
            <li className=' flex flex-col items-center justify-center'>
            <div className=" bg text-gray-400 text-[15px]"> ------------OR------------</div>

            {/* google login btn */}
            <button className=' flex justify-center items-center bg-blue-400 w-full text-lg text-white font-semibold rounded-md border-[3px] border-blue-300 hover my-5'
            onClick={handleGoogleSignIn}
            >
              <img src="./logo/google.png" className=' w-[18px] mr-2' alt="google" />
              Login With Google
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
