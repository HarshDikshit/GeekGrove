import { faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Login() {
  return (
    <>
      <div className=" w-full  flex justify-center items-center  py-5">

        {/* form goes here */}
        <div className=" lg:w-[30%] w-[90%]  sm:w-[50%] justify-center shadow-sm shadow-black rounded-md">
         {/* form elements goes here */}
         <div className=" w-full flex flex-col justify-center py-2 items-center">

          {/* heading goes here */}
          <h1 className=' uppercase font-bold text-2xl '>Login</h1>

          <ul>
            <li className=' mt-2'>
              <label htmlFor="email" className=' font-bold'>Email:</label>
              <input type="email" id = "email" placeholder='Email'
              className=' w-full px-2 py-1 text-black rounded-md border-[3px] border-gray-500' />
            </li>
            <li className=' mt-2'>
              <label htmlFor="password" className=' font-bold'>Password:</label>
              <div className="">
              <input type="password" id = "password" placeholder='Password'
              className=' w-full px-2 py-1 text-black rounded-md border-[3px] border-gray-500'
             
              />
              <FontAwesomeIcon icon="fa-solid fa-eye" />
              </div>
            </li>
            <li className=' mt-4'>
            <button className=' w-full text-white bg-indigo-400 text-lg rounded-md border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400 font-semibold'>Submit</button>
            </li>
            <li className=' flex flex-col items-center justify-center'>
            <div className=" text-gray-400 text-[15px]"> ------------OR------------</div>
            <button className=' bg-blue-400 w-full text-lg text-white font-semibold rounded-md border-[3px] border-blue-300 hover'>Login With Google</button>
            </li>
          </ul>
        
         </div>
        </div>
      </div>
    </>
  )
}

export default Login
