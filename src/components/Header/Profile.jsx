import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileDialog from '../Forms/ProfileDialog';


function Profile() {
  const [formStatus, setFormStatus] = useState(false)
    const userData = useSelector((state)=>state.auth.userData)
    
  return (
    <>
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-indigo-400 rounded-full'
    onClick={()=> (
      setFormStatus(!formStatus))}
    >Profile</button>
    
  <ProfileDialog currentUser={Object(userData)}  click={()=>setFormStatus(!formStatus)} className={` ${formStatus? 'block': 'hidden'}`}/>
</>
  )
}

export default Profile
