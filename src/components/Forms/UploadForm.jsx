import React, { useRef, useState } from 'react'
import Loading from '../Loading'
import {FaXmark} from 'react-icons/fa6'
import postUploadService from '../../Firebase/post'
import { useSelector } from 'react-redux'
import { serverTimestamp } from 'firebase/firestore'
import service from '../../Firebase/conf'
import Alert from '../Alert'
import { data } from 'autoprefixer'
import { v4 } from 'uuid'
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../firebase'
import {CircleIndicator} from 'react-indicators'

function UploadForm({className="", click, currentUser=""}) {
    const [title, setTitle] = useState("")
    const [token, setToken] = useState("")
    const [file, setFile] = useState("")
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [width, setWidth] = useState(0)

    const imageInputRef = useRef()

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const userf = useSelector((state) => state.auth.userData)

    const handleSubmit = async()=>{

      setSuccess("")
      setError("")

      // check for fields
      if(title === "" || token === "" || token === "select"){
        setError("fill required files")

      }else{
        // if file selected
        if(file !== ""){
          setLoading(true)
          const filename =`post/${token}/${v4()}`

          // upload task
          const storageRef = ref(storage, `${filename}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    let progress = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setWidth(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;
      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await postUploadService.createPost({folderName: token,createdBy: currentUser, post: {title: title, description: description, token: token, file: downloadURL, fileName: filename}, createdAt: today.toISOString() })
              .then(()=>
            {
              setSuccess('uploaded success')
              setError("")
              setLoading(false)
              setFile("")
            })
            .catch((e)=> {
              setLoading(false)
              console.log(e);
              setError(e.code)
              setSuccess("")
            })
    });
  }
);
        }else{
          await postUploadService.createPost({folderName: token,createdBy: currentUser, post: {title: title, description: description, token: token, file: link}, createdAt: today.toISOString() })
              .then(()=>
            {
              setSuccess('uploaded success')
              setError("")
              setLoading(false)
            })
            .catch((e)=> {
              setLoading(false)
              console.log(e);
              setError(e.code)
              setSuccess("")
            })
        }
        setFile("")
        setTimeout(()=>{click()},2000)
      }
    }

   return (
    <>

      <div id='outer-wrapper'  className={`${className} top-0 left-0 h-screen w-screen fixed z-[5] bg-black bg-opacity-60  backdrop-blur-sm`}>
      <div className='  w-full h-full  flex flex-col  items-center justify-center'>
      <div onClick={click} className='z-[3] w-screen h-screen absolute'></div>
        <div id='inner-wrapper' className="z-[4] flex flex-col justify-center items-center  md:w-[50%] w-[80%]  bg-slate-300 rounded-md shadow-sm shadow-black p-2">
            {/* items */}
            <div className=" w-[80%] flex flex-col justify-center my-8">

              {/* cross */}
              <div className=" flex justify-end">
              <FaXmark onClick={click} className=' w-[20px]'/>
              </div>

                {/* heading */}
                <div><h1 className=' uppercase text-black font-semibold  items-center flex justify-center'>Upload</h1></div>

                {/* hints and alerts goes here */}
  {success !=="" && <Alert onClick={()=> setSuccess('')} children={success} className=' bg-green-200 text-green-700 border-green-300'/>}
  {error !=="" && <Alert onClick={()=> setError('')} children={error} className=' bg-red-200 text-red-700 border-red-300'/>}
  {/* hints and alert ends here */}

                {/* title input box */}
                    <div>
                    <label htmlFor="title" className=' font-semibold '>Title</label>
              <input type="text" id = "title" placeholder='Title' value={title}
              className='text-white w-full my-2 bg-gray-700 rounded-md px-2 py-1 text-md border border-[3px] border-gray-300'
              onChange={(e) => {
                setTitle(e.target.value)
                }} />
                    </div>

                   
                     {/* description text area goes here */}
                    <label htmlFor="description" className=' font-semibold capitalize'>  Description:</label>

                    <textarea name="" id="description" rows="3" className=' text-white w-full my-2 bg-gray-700 rounded-md px-2 py-1 text-md border border-[3px] border-gray-300' placeholder='Enter Description Here(Optional)'
                    value={description}
                    onChange={(e) => {
                    setDescription(e.target.value)
                    }}/>

                    {/* token */}
                    <div>
                    <label htmlFor="token" className=' font-semibold'>Token</label>
                    <select name='token' id = "token" value={token}
                    className='text-white w-full my-2 bg-gray-700 rounded-md px-2 py-1 text-md border border-[3px] border-gray-300'
                    onChange={(e) => {
                    setToken(e.target.value)
                    }} >
                        <option aria-readonly value="select">--select--</option>
                        <option value="study">study</option>
                        <option value="update">update</option>
                        <option value="slide">slide</option>
                       
                    </select>
                    </div>

                    {/* file upload */}
                    <div>
                    <label htmlFor="file" className=' font-semibold'>File</label>
                    <input type="file" id = "file"
                    placeholder='optional'
                    ref={imageInputRef}
                    className='text-white w-full my-2 bg-gray-700 rounded-md px-2 py-1 text-md border border-[3px] border-gray-300'
                    onChange={(e) => {
                      setFile(e.target.files[0])
                      }} />
                    </div>

                    <div className=' flex justify-center'>------------OR------------</div>
                    {/* link */}
                    <div>
                    <label htmlFor="link" className=' font-semibold'>Link</label>
              <input type="text" id = "link" placeholder='Link (optional)' value={link}
              className='text-white w-full my-2 bg-gray-700 rounded-md px-2 py-1 text-md border border-[3px] border-gray-300'
              onChange={(e) => {
                setLink(e.target.value)
                }} />
                    </div>
                 
                    </div>

                    {/* sub-btn */}
                    <button  className=' flex justify-center items-center px-2 py-1 bg-indigo-400 text-white font-semibold text-lg w-full rounded-md border border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400' 
                    onClick={handleSubmit}>Submit
                    <Loading className={`${loading? 'block': 'hidden'} mx-2`}/>
                    </button>
                    {/* button ends here */}
            </div>
        </div>
        </div>
      
    </>
  )
}

export default UploadForm
