  import React, { useEffect, useState } from 'react'
  import service from '../Firebase/conf'
  import authService from '../Firebase/auth'
import { Alert, Carousal,AddDialog, DeleteDialog, StudyTable, Toggle, UpdatesTable } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import postUploadService from '../Firebase/post'
import {FaTrash, FaTrashCan} from 'react-icons/fa6'
import { FaPlusCircle } from 'react-icons/fa'
 
  function Home() {
    const [create, setCreate] = useState({
      status: false,
      data: null
  })

  const [deleteDialog, setDeleteDialog] = useState({
    status: false,
    data: null
})

const [addDialog, setAddDialog] = useState({
  status: false,
  data: null
})
const adminStatus = useSelector((state)=>state.auth.isAdmin)

    const authStatus = useSelector((state)=> state.auth.status)
    const userf = useSelector((state) => state.auth.userData)

    const find = async()=>{
      authStatus?  ( await authService.getCurrentUser()
      .then(async(user) => {
        await service.getUserDocs({uid: user.uid})
        .then((data) => console.log(data.data().email))
        .catch((e)=> console.log(e))
      })
      .catch((e)=> {console.log(e.code);})) : null
    }

    // slides mechanism
    const [slides,setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  

  const userArr = async ()=>{
    try {
      const fetchData = await postUploadService.getSlidesDocs();
      setLoading(false)
      setSlides(fetchData);
    } catch (error) {
      console.log(error.code);
    } 
  }
 

useEffect( ()=> {
  userArr();
},[])
    

  return (
  <div className=' dark:bg-slate-600'>
  {/* carousal */}
  <div  className=" m-auto">
     {/* when no images fetched */}
     {slides.length===0?  (
       <div className='  flex top-0 left-0  p-4'>
        <p>No Carousal images fetched...</p>
        
        { (
        <div className='p-2  bg-opacity-[40%] gap-2 flex bg-black rounded-lg'>
        <FaPlusCircle  onClick={()=> setAddDialog({status: !addDialog.status})}  className=' text-xl cursor-pointer text-white'/>
        </div>
      )}
      </div>)
    :
    // Carousal images
    ( <Carousal  autoSlide={true}>
      {/* img mapping */}
      {slides.map((s)=> (
        <div className=' min-w-full'>
        
          {/* create window */}
          { (
        <div className='absolute flex items-start justify-end p-4'>
        <div className='p-2  bg-opacity-[40%] gap-2 flex bg-black rounded-lg'>
        <FaPlusCircle  onClick={()=> setAddDialog({status: !addDialog.status, data: s})}  className=' text-xl cursor-pointer text-white'/>
        {adminStatus===true && (<FaTrashCan onClick={()=> setDeleteDialog({status: !deleteDialog.status, data: s})}  className=' text-xl cursor-pointer text-white'/>)}
        </div>
        </div>
        )}

        {/* img */}
        <img className=' cursor-pointer min-w-full' src={s.post.file}/>
        </div>
      ))}
    </Carousal>)}
    </div>

    <DeleteDialog data={deleteDialog.data}  click={()=>setDeleteDialog(!deleteDialog.status)} className={` ${deleteDialog.status? 'block': 'hidden'}`}  />
    <AddDialog currentUser={userf} data={addDialog.data}  click={()=>setAddDialog(!addDialog.status)} className={` ${addDialog.status? 'block': 'hidden'}`}  />

  </div>


  )}

  export default Home
