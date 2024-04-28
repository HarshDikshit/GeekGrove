import React, { useEffect, useState } from 'react'
import {FaXmark} from 'react-icons/fa6'
import Alert from '../Alert'
import Loading from '../Loading'
import {FaCircleCheck} from "react-icons/fa6"
import LogoutBtn from '../Header/LogoutBtn'
import service from '../../Firebase/conf'
import { useDispatch } from 'react-redux'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../../firebase'
import { login as authLogin} from '../../store/authSlice'
import { FaUserCircle } from 'react-icons/fa'






function ProfileDialog({className="", click, currentUser=""}) {
  console.log(currentUser);
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [rollNo, setRollNo] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState({file:null,url: ""})
    const [open, setOpen] = useState(true)

    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
      e.preventDefault()
      setLoading(true)
      try {
        if(img.file !==null){
      const storageRef = ref(storage, `userProfilePic/${currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, img.file);


      uploadTask.on('state_changed',
      (snapshot) => {}, 
      (error) => {
        setError(error.code)
        setSuccess("")
      }, 
() => {

getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
  const userDoc =  await service.updateProfile({
    uid: currentUser.uid,
    name: name,
    avatar: downloadURL,
    rollNo: rollNo,
    email: email,
    updatedAt: Date.now()})
    .then(async(data)=> {

      //check admin
      await service.getUserDocs({uid: currentUser.uid}).then((data)=>{
        dispatch(authLogin(Object(data.data())))
      })
    })
  })
})
        }else{
          const userDoc =  await service.updateProfile({
            uid: currentUser.uid,
            name: name,
            avatar: currentUser.avatar,
            rollNo: rollNo,
            email: email,
            updatedAt: Date.now()})
            .then(async(data)=> {
        
              //check admin
              await service.getUserDocs({uid: currentUser.uid}).then((data)=>{
                dispatch(authLogin(Object(data.data())))
              })
        })
      }
      setLoading(false)
      setIsTodoEditable((prev) => !prev);
      setError(error.code)
      setSuccess("")
      click()

    } catch (error) {
        setError(error.code)
        setSuccess("")
        setLoading(false)
    }
 }

    useEffect(()=>{
      setImg({
        url: currentUser.avatar,
        file: null
      })
      setName(currentUser.name)
      setEmail(currentUser.email)
      setRollNo(currentUser.rollNo)
    },[currentUser])
  return (
    <>
                <div id='outer-wrapper'  className={`${className} top-0 left-0 flex justify-center fixed h-full w-full  z-[1] bg-black bg-opacity-60  backdrop-blur-sm  `}>
                <div className='  w-full  flex flex-col items-center justify-center'>
                <div onClick={click} className='z-[3] w-full h-screen absolute'></div>
                <div id='inner-wrapper' className="  mt-12 z-[5] flex flex-col justify-center items-center  md:w-[20%] w-[50%]  bg-slate-300 rounded-md shadow-sm shadow-black p-2">
                {/* items */}
                <div className=" w-[80%] flex flex-col justify-center my-8">

                

                {/* heading */}
                <div className=' flex items-center justify-center'>
                  <h1 className=' uppercase text-black font-bold flex m-auto mb-5'>Profile</h1>
                {/* cross */}
                <div className=" flex justify-end">
                <FaXmark onClick={click} className=' flex items-center justify-center  cursor-pointer w-[20px]'/>
                </div>
                </div>

                {/* hints and alerts goes here */}
                {success !=="" && <Alert onClick={()=> setSuccess('')} children={success} className=' bg-green-200 text-green-700 border-green-300'/>}
                {error !=="" && <Alert onClick={()=> setError('')} children={error} className=' bg-red-200 text-red-700 border-red-300'/>}
                {/* hints and alert ends here */}

                {/* intro */}
                <div className=' my-2 justify-center  flex flex-col w-full h-full'>

                  {/* avatar */}
                  <div className=' mb-1 flex items-center text-black rounded-full'>
                    <label className=' flex items-center font-semibold' htmlFor="avatar">Avatar:
                <div>
                { img.url===null?
                (<FaUserCircle    className="ml-2  text-gray-600 mr-2 inline-block relative object-cover object-center !rounded-full  w-[40px] h-[40px] border-2 border-gray-400 p-0.5"
                />)
                :
                  (<div className='flex justify-end items-end'>
                <img
                src={img.url}
                className={` flex justify-end items-end ml-2 object-cover rounded-full w-[40px] h-[40px] border-2 border-indigo-400 p-0.5`}
                /> 
                 {currentUser.checks?.isVerify && ( <FaCircleCheck className=' absolute justify-self-end items-end rounded-full bg-white text-blue-600 mb-1'/>)}
                  </div>)}
                  

                  {/* input-img */}
               { isTodoEditable &&  <input
    id='avatar'
        name="file"
        type="file"
        style={{display:"none"}}
        accept="image/*"
        readOnly={!isTodoEditable}
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
      />}
                  </div>
                  </label>
                </div>

                {/* full-name */}
                <div className='mb-1 flex items-center text-black  '>
                  {/* label */}
                <label className=' font-semibold' htmlFor="name">Name: </label>
                {/* input */}
                  <input type="text" 
                  id='name'
                  className={` ${
                    isTodoEditable ? "border-black border-[2px] rounded-md px-2" : "border-transparent"
                } m-auto ml-2 flex bg-transparent border-transparent cursor-pointer hover:border-transparent`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!isTodoEditable}/>
                </div>

                  {/* Email */}
                  <div className=' mb-1 w-full flex items-center text-black  '>
                  {/* label */}
                <label className=' font-semibold' htmlFor="email">Email: </label>
                {/* input */}
                  <input type="text" 
                  id='email'
                  className={` ${
                    isTodoEditable ? "border-black border-[2px] rounded-md px-2" : "border-transparent"
                } m-auto ml-2 flex bg-transparent border-transparent cursor-pointer`}
                  value={email}
                  readOnly/>
                </div>

                 {/* Roll No */}
                 <div className=' mb-1 w-full flex items-center text-black  '>
                  {/* label */}
                <label className=' font-semibold' htmlFor="rollNo">RollNo: </label>
                {/* input */}
                  <input type="number" 
                  id='rollNo'
                  className={` ${
                    isTodoEditable ? "border-black border-[2px] rounded-md px-2" : "border-transparent"
                } m-auto ml-2 flex bg-transparent border-transparent cursor-pointer`}
                  value={rollNo}
                  onChange={(e) => {
                    if(e.target.value.length <= 13){
                    setRollNo(e.target.value)
                    }
                    }}
                  readOnly={!isTodoEditable}/>
                </div>
                </div>
                

                {/* sub-btn */}
                {isTodoEditable?
                (<button
                 onClick={handleSubmit}
                className=' flex justify-center items-center px-2 py-1 bg-indigo-400 text-white font-semibold text-lg w-full rounded-md border border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400' 
                >Submit
                <Loading className={`${loading? 'block': 'hidden'} mx-2`}/>
                </button>):
                (<button
                  onClick={() => {
                    setIsTodoEditable((prev) => !prev);
               }}
                 className=' flex justify-center items-center px-2 py-1 bg-indigo-400 text-white font-semibold text-lg w-full rounded-md border border-[3px] border-indigo-300 hover:bg-indigo-500 hover:border-indigo-400' 
                 >Edit Profile
                 <Loading className={`${loading? 'block': 'hidden'} mx-2`}/>
                 </button>)}
                {/* button ends here */}

                {/* logout btn */}
                <LogoutBtn className='flex justify-center items-center px-2 py-1 bg-blue-400 text-white font-semibold text-lg w-full rounded-md border border-[3px] border-indigo-300 hover:bg-blue-500 hover:border-indigo-400' />
            </div>
        </div>
        </div>
        </div>
    </>
  )
}

export default ProfileDialog
