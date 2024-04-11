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
  const user = useSelector((state) => state.auth.userData)
  const v= JSON.stringify(user)
  console.log(user);
  console.log(v);




  const handleSubmit = async(e) => {
    e.preventDefault();
    if (authStatus){
      if(title === "" || description === ""){
        setSuccess('')
        setError('Kindly fill required fields!!')
      } else{
        setLoading(true)
        authService.getCurrentUser()
      .then(async(user) => {
  
  const comm = await service.updateComments({uid: user.uid, comments: {title: title,
  description: description,
  postedAt: serverTimestamp()}})
  .then(()=>{
    setError("")
  setSuccess('Success!! your feedback added successfully')
  setLoading(false)
}
).catch((e)=> {
  setLoading(false)
  console.log(e.code);
})
})
.catch()

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
<div>

{/* right part */}
<div className=" w-full flex justify-center pb-10">
  <div className=" w-full px-8 md:px-40">

    {/* heading */}
    <div className=' flex justify-center '>
    <h1 className=' justify-self-center text-gray-800 uppercase font-bold text-2xl my-2'>Feedback</h1>
    </div>
    {/* title input */}
<label htmlFor="title" className=' font-semibold'> <span className=' text-red-700 font-semibold'>*</span> Title:</label>
    <input id='title' type="text" className=' bg-gray-700 rounded-md px-2 py-1 text-md w-full my-2 border border-[3px] border-gray-300 text-white' placeholder="Enter Title Here..." value={title}
    onChange={(em) => {
      setTitle(em.target.value)
    }} />



    {/* description text area goes here */}
    <label htmlFor="description" className=' font-semibold capitalize'> <span className=' text-red-700 font-semibold'>*</span> description:</label>

    <textarea name="" id="description" rows="5" className=' text-white w-full my-2 bg-gray-700 rounded-md px-2 py-1 text-md border border-[3px] border-gray-300' placeholder='Enter Description Here...'
    onChange={(e) => {
      setDescription(e.target.value)
    }}/>

    <div className= {`${error? 'block' : 'hidden'} flex justify-center text-red-700 bg-red-200 rounded-md border-[2px] border-red-300 mb-2`}>
    {error!== "" && error}
    {setTimeout(()=> setError('') , 3000)} </div>
    <div className={`${success? "block": "hidden"} flex justify-center text-green-700 bg-green-200 rounded-md border-[2px] border-green-300 mb-2`}>
    {success !== "" && success}
    {setTimeout(()=> setSuccess('') , 3000)}
    </div>

    {/* button goes here */}
    <button className=' flex justify-center items-center px-2 py-1 bg-indigo-400 text-white font-semibold text-lg w-full rounded-md border border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400' 
    onClick={handleSubmit}>Submit
    <Loading className={`${loading? 'block': 'hidden'} mx-2`}/>
    </button>
  </div>
</div>


{/* left part */}

<div className=" bg-gray-500 flex w-full ">
  {/* inner left */}

  <div className=" w-full flex  px-3 py-4 justify-center items-center ">

    {/* content */}

    <div className=' flex flex-col justify-center items-center ml-10'>
    

    
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
