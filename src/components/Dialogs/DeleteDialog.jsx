import React, { useState } from 'react'
import { FaTrashCan } from 'react-icons/fa6'
import service from '../../Firebase/conf';
import { FaCheckCircle, FaExclamation, FaExclamationCircle } from 'react-icons/fa';
import postUploadService from '../../Firebase/post';

function DeleteDialog({className="", click, data}) {

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

    const handleDelete =async()=>{
        setSuccess("")
        setError("")

      try {
        if(data.post.fileName && data.post.fileName !=="" ){
          await service.deleteFile({Ref: data.post.fileName})
          .then(async()=>{
            await postUploadService.deleteSlidesDoc({token: "study", id: data.id})
            .then(()=>{
              setSuccess("Deleted successfully")
            })
          })
        }else{
          await postUploadService.deleteSlidesDoc({token: "study", id: data.id})
          .then(()=>{
            setSuccess("Deleted successfully")
          })
        }
        setError("")
        setSuccess("")
         setTimeout(()=>{click()},2000)
      } catch (error) {
        setSuccess("")
        setError(error.code)
      }
    }
    return (
    <div>
        <div id='outer-wrapper'  className={`${className} top-0 left-0 flex justify-center fixed h-full w-full  z-[1] bg-black bg-opacity-60  backdrop-blur-sm  `}>
                <div className='  w-full  flex flex-col items-center justify-center'>
                <div onClick={click} className='z-[3] w-full h-screen absolute'></div>
                <div id='inner-wrapper' className="  mt-12 z-[5] flex flex-col justify-center items-center  md:w-[40%] w-[80%] bg-white rounded-md shadow-sm shadow-black p-2">
                    {/* items */}

                    <div className=" w-[80%] flex flex-col justify-center my-8">
                        {/* heading */}
                <div className=' flex items-center justify-center'>
                  <h1 className=' uppercase text-black font-bold text-xl flex m-auto mb-2'>Delete</h1>
                  </div>

                {/* msg */}
                  <div className=' flex items-center justify-center'>
                  <p className=' uppercase text-black flex m-auto mb-5'>Are you sure???</p>
                  </div>

               
                  <div className=' flex items-center justify-center'>


                     {/* delete btn */}
                  <button onClick={click} className=' flex bg-gray-700 justify-center items-center text-white rounded-md border-[2px] border-gray-400 font-bold p-2 mx-2'>Cancel</button>

                     {/* cancel btn */}
                  <button onClick={handleDelete} className=' flex bg-red-700 justify-center items-center text-white rounded-md border-[2px] border-red-400 font-bold p-2 mx-2'>  Delete <FaTrashCan className=' ml-2 text-white'/></button>
                  </div>

                 
                  
                  {error!=="" && (
                    <div className=' text-red-700 flex-wrap flex items-center justify-center mt-2'>
                       <FaExclamationCircle className=' text-red-700 mr-2'/> {error}
                       </div>
                  )}

                  {success!=="" && (
                    <div className=' text-green-700 flex-wrap flex items-center justify-center mt-2'>
                       <FaCheckCircle className=' text-green-700 mr-2'/> {success}
                       </div>
                  )}
                 

                    </div>
                </div>
                </div>
                </div>
    </div>
    )
}

export default DeleteDialog
