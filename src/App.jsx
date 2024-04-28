import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { Header} from "./components"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"
import {Outlet} from 'react-router-dom'
import authService from "./Firebase/auth"
import {checkAdmin, login, logout} from './store/authSlice'
import service from "./Firebase/conf"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"




function App() {
const [loading, setLoading] = useState(false)
const dispatch = useDispatch()
let authStatus = useSelector((state)=> state.auth.status)
let authData = useSelector((state)=> state.auth.userData)

useEffect(() => {

  try {
      onAuthStateChanged(auth, async(user)=>{
      await service.getUserDocs({uid: user.uid})
      .then((data)=>{
       
        // check for current user
        if (user !== null) {
          //dispatch action for login
          dispatch(login(Object(data.data())))
      }else {
        console.log(userData);
        dispatch(logout())
      }
      setLoading(false)
       //check for admin
       if(data.data().checks.isAdmin === true){
        //dispatch for admin action
        dispatch(checkAdmin())
      }
    })
  })
} catch (error) {
    throw error
}
  
}, [authStatus])

return !loading? (
  <>
  <div className=" container min-w-full min-h-full flex flex-col">
    
  <Header/>

  <div>
  <Outlet />
  </div>
    
    <div className="  flex items-end justify-end">
  <Footer/>
  </div>
  </div>
  
  </>
) : null
}

export default App
