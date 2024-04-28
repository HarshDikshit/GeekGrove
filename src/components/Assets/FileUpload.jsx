import React, { useState } from 'react'
import Alert from '../Alert';
import {FaUserCircle} from "react-icons/fa"
import { useDispatch } from 'react-redux';


function FileUpload({avatar}) {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [img, setImg] = useState({file:null,url: ""})
  return (
    <div>
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
    <div className=' text-red-700'>
        {error !== '' && error }
    </div>
    </div>
  )
}

export default FileUpload
