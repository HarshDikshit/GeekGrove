import React, { useId, useState } from 'react'
import Alert from '../Alert';
import {useSelector} from 'react-redux'
import service from '../../Firebase/conf';
import { serverTimestamp } from 'firebase/firestore';
import authService from '../../Firebase/auth';
import { v4 } from 'uuid';
import Loading from '../Loading';
import {FaSquareFacebook, FaSquareTwitter, FaSquareInstagram, FaSquareYoutube} from 'react-icons/fa6'



function Footer() {

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState("")
  
  const authStatus = useSelector((state) => state.auth.status)


  // const userf = useSelector((state) => state.auth.userData)
  // console.log(userf);



  const handleSubmit = async(e) => {
    e.preventDefault();
    // check if user is authenticated
    if (authStatus){

      // checl fields if filled
      if(title === "" || description === ""){
        setSuccess('')
        setError('Kindly fill required fields!!')
      } else{
        setLoading(true)
        // get logged in user Credential
    authService.getCurrentUser()
  .then(async(user) => {
  
        // add comments
    const comm = await service.addComments({uid: user.uid, comments: {title: title,
    description: description,
    postedAt: serverTimestamp()
}})
  .then(()=>{
    setError("")
    setSuccess('Success!! your feedback added successfully')
    setTitle('')
    setDescription('')
    setLoading(false)
}
).catch((e)=> {
  setLoading(false)
  setSuccess('')
  setError(e.code)
})
})
.catch((e)=>
 {
   setLoading(false)
  setSuccess('')
  setError(e.code)
}
)
      }     
    }else{
      setSuccess('')
      setError('Kindly login first to push feedback')
    }
    
}
return (
    <>
<div className=' items-end w-full  justify-evenly
overflow-hidden bg-slate-800 border border-t-2 border-t-gray-300'>

{/* main div */}
<div className=' flex md:flex-nowrap flex-wrap items-center justify-between m-auto'>

{/* left part */}
<div className=" w-full flex flex-col  justify-center pb-10">

  {/* item */}

<div>
      {/* heading */}
  <div className=" flex flex-col w-full mb-3 px-8 md:px-40  justify-center">

    <div className=' flex flex-col justify-center items-center'>
    <h1 className=' justify-self-center text-gray-300 uppercase font-bold text-2xl my-2'>About</h1>
    <div className=' bg bg-yellow-400 w-[100px] h-[3px] justify-self-center'></div>
    </div>

    <div>
      <ul className=' text-gray-200 justify-center items-center md:ml-4 md:items-start my-2 flex flex-col  font-semibold'>
        <li>History</li>
        <li>Our Team</li>
        <li>Brand Guidelines</li>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
      </ul>
    </div>

  </div>

</div>
</div>

{/* middle part */}
<div className=" w-full flex flex-coljustify-center pb-10">
  
<div className=' m-auto '>
  {/* pages */}
<div className=" flex flex-col w-full mb-3 px-8 md:px-40">

<div className=' flex flex-col justify-center items-center'>
    <h1 className=' justify-self-center text-gray-300 uppercase font-bold text-2xl my-2'>Services</h1>
    <div className=' bg bg-yellow-400 w-[120px] h-[3px] justify-self-center'></div>
    </div>

<div>
  <ul className=' text-gray-200 justify-center items-center md:items-start md:ml-4 my-2 flex flex-col  font-semibold'>
    <li>Course</li>
    <li>Blogs</li>
    <li>Events</li>
    <li>Contest</li>
    <li>Payment Method</li>

  </ul>
</div>

</div>
</div>

</div>

{/* help and support */}
<div className=" flex flex-col w-full mb-3 px-8 md:px-40">

<div className=' flex flex-col justify-center items-center '>
<h1 className=' justify-self-center  text-indigo-500 uppercase font-bold text-2xl my-2'>Geek Grove</h1>
<h5 className=' justify-self-center text-indigo-500  text-md '>You can visit our social media handles.</h5>

</div>

<div>
  <ul className=' text-gray-200 justify-center my-2 gap-2 flex   font-semibold'>
    <li><FaSquareFacebook className=' text-blue-300'/></li>
    <li><FaSquareTwitter className=' text-blue-300'/></li>
    <li><FaSquareInstagram className=' text-blue-300'/></li>
    <li><FaSquareYoutube className=' text-blue-300'/></li>
  </ul>
</div>

</div>
</div>


{/* lower part */}

<div className=" bg-slate-900 flex w-full ">
  <div className=" w-full flex  px-3 py-4 justify-center items-center ">

    {/* content */}

    <div className=' flex flex-col justify-center items-center ml-10'>
  <p className=' flex justify-center items-center text-gray-300'>
  <span className=' font-bold pr-2'>Geek Grove</span> &copy; Copyright 2024
  </p>
  </div>
  </div>
</div>
</div>


</>
)
}

export default Footer
