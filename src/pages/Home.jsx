  import React, { useEffect, useState } from 'react'
  import service from '../Firebase/conf'
  import authService from '../Firebase/auth'
import { Alert, Carousal, Toggle } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import postUploadService from '../Firebase/post'
import {FaTrash} from 'react-icons/fa6'
 
  function Home() {

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
  <>
  <div className=" m-auto">
    <Carousal children={slides} autoSlide={true}>
      {slides.map((s)=> (
        <div className='min-w-full'>
        <img className=' min-w-full' src={s.post.file}/>
        </div>
      ))
      }
      
    </Carousal>
    
    </div>

  {/* below */}
 <div className=" w-full dark:bg-slate-600">
  {/*main */}
  <div className=" flex flex-wrap justify-center">
  </div>
 </div>
  </>


  )}

  export default Home
