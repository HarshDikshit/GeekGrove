  import React from 'react'
  import service from '../Firebase/conf'
  import authService from '../Firebase/auth'
import { Alert, Carousal, Toggle } from '../components'
import { useSelector, useDispatch } from 'react-redux'
  
  

 

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

    const slides = [
      "https://images.freeimages.com/images/large-previews/e7e/lisbon-bridge-1235926.jpg?fmt=webp&w=500",

      "https://i.ibb.co/ncrXc2V/1.png",
      "https://i.ibb.co/B3s7v4h/2.png",
      "https://i.ibb.co/XXR8kzF/3.png",
      "https://images.freeimages.com/images/large-previews/155/bridge-1559052.jpg?fmt=webp&h=350",
    ]
    

  return (
  <>
  <div className=" m-auto">
    <Carousal autoSlide={true}>
      {slides.map((s)=> (
        <img className=' min-w-full' src={s}/>
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
