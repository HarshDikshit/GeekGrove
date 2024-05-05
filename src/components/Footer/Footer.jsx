import React, { useId, useState } from 'react'
import Alert from '../Alert';
import {useSelector} from 'react-redux'
import service from '../../Firebase/conf';
import { serverTimestamp } from 'firebase/firestore';
import authService from '../../Firebase/auth';
import { v4 } from 'uuid';
import Loading from '../Loading';



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
overflow-hidden pt-10 bg-gray-400 border border-t-2 border-t-gray-300'>

{/* main div */}
<div className=' flex md:flex-nowrap flex-wrap items-center justify-center m-auto'>

{/* left part */}
<div className=" w-full flex flex-col  justify-center pb-10">

  {/* item */}

<div className=' m-auto'>
      {/* heading */}
  <div className=" flex flex-col w-full mb-3 px-8 md:px-40  justify-center">

    <div className=' flex flex-col justify-center '>
    <h1 className=' justify-self-center text-gray-800 uppercase font-bold text-2xl my-2'>Technologies Used</h1>
    <div className=' bg bg-yellow-400 w-[250px] h-[3px] justify-self-center'></div>
    </div>

    <div>
      <ul className=' text-gray-200 justify-center my-2 ml-6 flex flex-col  font-semibold'>
        <li>REACT JS</li>
        <li>Firebase (Backened Service)</li>
        <li></li>
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

<div className=' flex flex-col justify-center '>
<h1 className=' justify-self-center text-gray-800 uppercase font-bold text-2xl my-2'>pages</h1>
<div className=' bg bg-yellow-400 w-[90px] h-[3px] justify-self-center'></div>
</div>

<div>
  <ul className=' text-gray-200 justify-center my-2 ml-6 flex flex-col  font-semibold'>
    <li>Home</li>
    <li>Feeds</li>
    <li>Login</li>
  </ul>
</div>

</div>

 {/* help and support */}
<div className=" flex flex-col w-full mb-3 px-8 md:px-40">

<div className=' flex flex-col justify-center '>
<h1 className=' justify-self-center text-gray-800 uppercase font-bold text-2xl my-2'>Support</h1>
<div className=' bg bg-yellow-400 w-[130px] h-[3px] justify-self-center'></div>
</div>

<div>
  <ul className=' text-gray-200 justify-center my-2 ml-6 flex flex-col  font-semibold'>
    <li>[harshdixitofficial@gmail.com]</li>
  </ul>
</div>

</div>
</div>

</div>
</div>

{/* left part */}
<div className=" w-full flex flex-coljustify-center pb-10">
  
<div className=' m-auto '>

</div>

</div>

{/* lower part */}

<div className=" bg-gray-500 flex w-full ">
  <div className=" w-full flex  px-3 py-4 justify-center items-center ">

    {/* content */}

    <div className=' flex flex-col justify-center items-center ml-10'>
  <p className=' flex justify-center items-center text-gray-800'>
    &copy; Copyright 2024
  </p>
  </div>
  </div>
</div>
</div>


</>
)
}

export default Footer
