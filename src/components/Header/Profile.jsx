import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileDialog from '../Forms/ProfileDialog';
import { FaCircleExclamation } from 'react-icons/fa6';


function Profile() {
  const [formStatus, setFormStatus] = useState(false)
    const userData = useSelector((state)=>state.auth.userData)
    
  return (
    <>
    <button
    className='inline-bock px-6 flex justify-center items-center py-2 duration-200 hover:bg-blue-100 hover:text-indigo-400 rounded-full'
    onClick={()=> (
      setFormStatus(!formStatus))}
    >Profile
    <div className=' ml-2 flex w-full h-full justify-end items-end'>

   {userData.rollNo ==="" || !userData.checks?.isVerify  && ( <FaCircleExclamation className=' text-red-600 opacity-70 bg-white rounded-full'/>)}
    </div>
    </button>
    
  <ProfileDialog currentUser={Object(userData)}  click={()=>setFormStatus(!formStatus)} className={` ${formStatus? 'block': 'hidden'}`}/>
</>
  )
}

export default Profile
