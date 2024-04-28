  import React, { useState } from 'react'
  import authService from '../Firebase/auth'
  import { login as authLogin, logout } from '../store/authSlice'
  import {useDispatch} from 'react-redux'
  import {Link, useNavigate} from 'react-router-dom'
  import service from '../Firebase/conf'
  import { serverTimestamp } from 'firebase/firestore'
  import { FileUpload, Loading } from '../components'
  import { data } from 'autoprefixer'
  import {FaEye, FaEyeSlash, FaUserCircle} from 'react-icons/fa'
  import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
  import { v4 } from 'uuid'
  import { storage } from '../../firebase'
  
  



  function SignUp() {

    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [name, setName] = useState("")
    const [rollNo, setRollNo] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [img, setImg] = useState({file:null,url: ""})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
  // sign-in-email/password
    const handleSignUp = async() => {
      if(name === "" || rollNo === "" || email === "" || password === ""){
        setSuccess('')
        setError('To register fill all the fields!!')
      } else{
        setLoading(true)
        setError("")
        try {
          const session = await authService.createAccount({email: email, password: password})
          .then(async(user) => {
            
              const storageRef = ref(storage, `userProfilePic/${user.user.uid}`);
              const uploadTask = uploadBytesResumable(storageRef, img.file);


              uploadTask.on('state_changed',
              (snapshot) => {}, 
              (error) => {
                setError(error.code)
                setSuccess("")
              }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      

      
              const userDoc =  await service.createUserDoc({
                uid: user.user.uid,
                name: name,
                avatar: img.url !==""?downloadURL: null,
                rollNo: rollNo,
                email: user.user.email,
                createdAt: Date.now()})
                .then(async(data)=> {

                  //check admin
                  await service.getUserDocs({uid: user.user.uid}).then((data)=>{
                    dispatch(authLogin(Object(data.data())))
                  })
                  
                setSuccess('Success!! you are logged in');
                setError('');
                navigate("/");
              })
              .catch((e)=>{ setError(e.code)
              console.log(e.code);
              })
              setGoogleLoading(false)
          
    })
  })
})
        
        
        } catch (error) {
        setSuccess('')
        setError(error.code)
        setLoading(false)
        console.log(error.code);
        }
      
      }
    }

    // sign-in-google
      const handleGoogleSignIn = async () => {
        setGoogleLoading(true)
        try {
          const session = await authService.googleSignUp().then(async(user) => {
            const check = await service.getUserDocs({uid: user.user.uid})
            
              const userDoc =  await service.updateDoc({
                uid: user.user.uid,
                avatar: user.user.photoURL,
                name: user.user.displayName,
                email: user.user.email,
                updatedAt: serverTimestamp() }).then(()=> {
                setSuccess('Success!! you are logged in');
                setError('');
                navigate("/");
              })
              .catch((e)=> setError(e.code))
            
            //check admin 
              await service.getUserDocs({uid: user.user.uid}).then((data)=>{
                dispatch(authLogin(Object(data.data())))
                if(data.data().checks.isAdmin === true){
                  dispatch(checkAdmin())
                }
              })
              setGoogleLoading(false)
          })
        } catch (error) {
          setSuccess('')
          setError(error.code)
          setGoogleLoading(false)
        }
      }
    
    return (
      <>
        <div className=" w-full  flex justify-center items-center py-5 dark:bg-slate-600">

          {/* form goes here */}
          <div className=" lg:w-[30%] w-[90%]  sm:w-[50%] justify-center shadow-sm shadow-black rounded-md dark:bg-slate-700">
          {/* form elements goes here */}
          <div className=" w-full flex flex-col justify-center py-2 items-center">

            {/* heading goes here */}
            <h1 className=' uppercase font-bold text-2xl dark:text-slate-300'>register</h1>
            {/* error */}

            <div className= {`${error? 'block' : 'hidden'} flex justify-center text-red-700 bg-red-200 rounded-md border-[2px] border-red-300 mb-2`}>
      {error!== "" && error} </div>

      {/* success */}
      <div className={`${success? "block": "hidden"} flex justify-center text-green-700 bg-green-200 rounded-md border-[2px] border-green-300 mb-2`}>
      {success !== "" && success}
      </div>

      {/* elements */}
            <ul className=' w-[80%]'>

              {/* avatar */}
              <li>

              <label htmlFor='file' className=' flex justify-center items-center mt-4'>
                  {img.url==="" ? (<FaUserCircle     className=" text-gray-300 mr-2 inline-block relative object-cover object-center !rounded-full w-16 h-16 border-2 border-gray-400 p-0.5"
  />): (
    <img
      src={img.url}
      alt="avatar"
      className=" mr-2 inline-block relative object-cover object-center !rounded-full w-16 h-16 border-2 border-indigo-400 p-0.5"
    />
    ) }
              </label>
    <input
    id='file'
        name="file"
        type="file"
        style={{display:"none"}}
        accept="image/*"
        onChange={(event) => {
          if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].size > 1 * 1000 * 1024) {
            setError("File with maximum size of 1MB is allowed")
              console.log("File with maximum size of 1MB is allowed");
              return false;
            }
              setError('')
            // do other operation
            setImg({
              file:event.target.files[0],
              url: URL.createObjectURL(event.target.files[0])
            })
          }
        }}
      />
              </li>

            {/* name input */}
            <li className=' mt-2'>
                <label htmlFor="name" className=' font-bold dark:text-slate-300'>Full Name:</label>
                <input type="email" id = "name" placeholder='Full Name'
                className=' capitalize w-full px-2 py-1 text-black rounded-md border-[3px] border-gray-500 dark:bg-slate-800 dark:text-slate-300'
                value={name}
                onChange={(e) => setName(e.target.value)} />
              </li>
              {/* roll no field */}
              <li className=' mt-2'>
                <label htmlFor="rollNo" className=' font-bold dark:text-slate-300'>AKTU Roll Number:</label>
                <input type="number" id = "rollNo" placeholder='AKTU Roll Number (13 digits)'
                className=' capitalize w-full px-2 py-1 text-black rounded-md border-[3px] border-gray-500 dark:bg-slate-800 dark:text-slate-300'
                value={rollNo}
                min={0}
                onChange={(e) => {
                  if(e.target.value.length <= 13){
                  setRollNo(e.target.value)
                  }
                  }} />
              </li>

              {/* email input */}
              <li className=' mt-2'>
                <label htmlFor="email" className=' font-bold dark:text-slate-300'>Email:</label>
                <input type="email" id = "email" placeholder='Email'
                className=' w-full px-2 py-1 text-black rounded-md border-[3px] border-gray-500 dark:bg-slate-800 dark:text-slate-300'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              </li>

              {/* password input */}
              <li className=' mt-2'>
                <label htmlFor="password" className=' font-bold dark:text-slate-300'>Password:</label>
                <div className=" flex items-center text-black bg-gray-400 rounded-md border-[3px] border-gray-500">
                <input type={passwordVisible? "text" : "password"} id = "password" placeholder='Password'
                className=' w-full px-2 py-1 rounded-md dark:bg-slate-800 dark:text-slate-300 '
                value={password}
              onChange={(e) => setPassword(e.target.value)}
                />
                <div className='w-[18px] mx-2' onClick={() => setPasswordVisible(!passwordVisible)}> 
                  {passwordVisible? (<FaEye/>):(<FaEyeSlash/>)}
                </div>
                </div>
              </li>
            {/* SignUp btn */}
              <li className=' mt-4'>
              <button className='  flex justify-center items-center w-full text-white bg-indigo-400 text-lg rounded-md border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400 font-semibold mb-5'
              onClick={handleSignUp}
              >
                
                Register
                <Loading className={`${loading? 'block': 'hidden'} mx-2`}/>
                </button>
              </li>

              <li className='flex justify-center items-center'>
                <p className=' text-slate-400 my-2 flex text-sm'>Already have an account?</p>
                <Link to='/login' className=' ml-1 text-blue-600 underline text-sm'>Login</Link>
              </li>

              <li className=' flex flex-col items-center justify-center'>
              <div className=" text-gray-400 text-[15px]"> ------------OR------------</div>

              {/* google SignUp btn */}
              <button className=' flex justify-center items-center bg-blue-400 w-full text-lg text-white font-semibold rounded-md border-[3px] border-blue-300 hover my-5'
              onClick={handleGoogleSignIn}
              >
                  <img src="./logo/google.png" className=' w-[18px] mr-2' alt="google" />
                Register With Google
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

  export default SignUp
