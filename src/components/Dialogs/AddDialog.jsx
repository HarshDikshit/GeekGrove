import React, { useState } from 'react'
import { FaCheckCircle, FaExclamationCircle, FaPlusCircle } from 'react-icons/fa'
import { FaTrashCan } from 'react-icons/fa6'
import postUploadService from '../../Firebase/post'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 } from 'uuid'
import { storage } from '../../../firebase'
import Loading from '../Loading'

function AddDialog({className='',click, currentUser=''}) {

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [img, setImg] = useState({file:null,url: ""})
    const [loading, setLoading] = useState(false)


    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const handleSubmit =()=>{
       

        try {
            if(img.url !== "" && error===""){
                setError("")
                setSuccess("")
                setLoading(true)
                const filename =`post/slide/${v4()}`
                // upload task
                const storageRef = ref(storage, `${filename}`);
                const uploadTask = uploadBytesResumable(storageRef, img.file);
      
      uploadTask.on('state_changed',
        (snapshot) => {
        }, 
        (error) => {
            setError(error.code)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await postUploadService.createPost({folderName: "slide",createdBy: currentUser, post: {token:'slide', file: downloadURL, fileName: filename}, createdAt: today.toISOString() })
                    .then(()=>
                  {
                    setSuccess('Successfully upload')
                    setError("")
                    setLoading(false)
                    setImg({url: "", file: null})
                    setTimeout(()=>{setError("")
                    setSuccess("")
                        click() 
                        
                    },2000)
                  })
                  .catch((e)=> {
                    setLoading(false)
                    console.log(e);
                    setError(e.code)
                    setSuccess("")
                  })
          });
        })}
        } catch (error) {
            
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
                  <h1 className=' uppercase text-black font-bold text-xl flex m-auto mb-2'>Add Images</h1>
                  </div>

                {/* file */}
                <div className=' flex flex-wrap p-2 m-auto'>
                <input
                className=' flex flex-wrap'
                id='file'
                name="file"
                type="file"
                accept="image/*"
                onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                if (event.target.files[0].size > 1 * 1000 * 1024) {
                setError("File with maximum size of 1 MB is allowed")
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
                </div>

                {/* btns */}
                  <div className=' flex items-center justify-center'>
                     {/* cancel btn */}
                  <button onClick={click} className=' flex bg-gray-700 justify-center items-center text-white rounded-md border-[2px] border-gray-400 font-bold p-2 mx-2'>Cancel</button>

                     {/* add btn */}
                  <button  onClick={handleSubmit}   className=' gap-2 flex bg-green-700 justify-center items-center text-white rounded-md border-[2px] border-green-400 font-bold p-2 mx-2'>  Add <FaPlusCircle className=' text-white'/>
                  <Loading className={`${loading? 'block': 'hidden'} mx-2`}/>

                  </button>
                  </div>

                 
                  
                  {error!=="" && (
                    <div className=' text-red-700 flex-wrap flex items-center justify-center mt-2'>
                        <div className=" flex gap-2 justify-center items-center">
                       <FaExclamationCircle className=' text-red-700 w-[20px]'/> {error}</div>
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

export default AddDialog
