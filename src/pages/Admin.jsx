import React, { useState } from 'react'
import { AdUsersCtrl, SearchAdmin, UploadForm } from '../components'
import {FaPlus} from 'react-icons/fa'
import { useSelector } from 'react-redux'




function Admin() {

  const [formStatus, setFormStatus] = useState(false) 

  const userf = useSelector((state) => state.auth.userData)
  
  return (
    <div className=' z-[3] min-h-full'>  
      {/* nav-admin */}
       <div className=' flex items-center justify-end py-1 px-5 w-full bg-gray-400 text-white' > 
      {/* add-btn */}
      <div className=' cursor-pointer flex items-center ' onClick={()=> (
      setFormStatus(!formStatus)
      )}>
      <FaPlus className=' mx-1 w-[20px]' />
      Add
      </div>
      </div>

      {/* upload form */}
      <UploadForm currentUser={Object(userf)} click={()=>setFormStatus(!formStatus)} className={` ${formStatus? 'block': 'hidden'}`}/>

      <SearchAdmin/>

      {/* user-ctrl-panel */}
      <AdUsersCtrl/>
   
   
    </div>
  )
}

export default Admin
