import React, { useState } from 'react'
import Alert from '../Alert';
 

function Footer() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title === "" && description === ""){
      setSuccess('')
      setError('Kindly fill required fields!!')
    } else{
      setError("")
      setSuccess('Success!! your feedback added successfully')
    }
  }
return (
    <>
<div className=' items-end w-full  justify-evenly
overflow-hidden pt-10 bg-gray-400 border border-t-2 border-t-gray-300'>

{/* main div */}
<div>

{/* right part */}
<div className=" w-full flex justify-center pb-10">
  <div className=" w-full px-8 md:px-40">

    {/* heading */}
    <div className=' flex justify-center '>
    <h1 className=' justify-self-center text-gray-800 uppercase font-bold text-2xl my-2'>Feedback</h1>
    </div>
    {/* title input */}

    <input type="text" className=' bg-gray-700 rounded-md px-2 py-1 text-md w-full my-2 border border-[3px] border-gray-300 text-white' placeholder="Enter Title Here..." value={title}
    onChange={(em) => {
      setTitle(em.target.value)
    }} />



    {/* description text area goes here */}
    <textarea name="" id="" rows="5" className=' text-white w-full my-2 bg-gray-700 rounded-md px-2 py-1 text-md border border-[3px] border-gray-300' placeholder='Enter Description Here...'
    onChange={(e) => {
      setDescription(e.target.value)
    }}/>

    <div className=' flex justify-center text-red-700 bg'>
    {error!== "" && error} </div>
    <div className=' flex justify-center text-green-700'>
    {success !== "" && success}
    </div>

    {/* button goes here */}
    <button className=' px-2 py-1 bg-indigo-400 text-white font-semibold text-lg w-full rounded-md border border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400' 
    onClick={handleSubmit}>Submit</button>
  </div>
</div>


 {/* left part */}

 <div className=" bg-gray-500 flex w-full ">
  {/* inner left */}

  <div className=" w-full flex  px-3 py-4 justify-center items-center ">

    {/* content */}

    <div className=' flex flex-col justify-center items-center ml-10'>
    {/* logo goes here */}

    {/* <img 
    src="/logo/iert-logo.jpg" alt="logo"
    className=' w-[100px] rounded-full border border-[3px] border-gray-300'
    /> */}
  <p className=' flex justify-center items-center text-gray-800'>
    &copy; Copyright 2023
  </p>
  </div>
  </div>



</div>
</div>
</div>


</>
)
}

export default Footer
