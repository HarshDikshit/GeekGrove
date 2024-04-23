import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { Header} from "./components"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"
import {Outlet} from 'react-router-dom'
import authService from "./Firebase/auth"
import {login, logout} from './store/authSlice'
import service from "./Firebase/conf"


function App() {
const [loading, setLoading] = useState(false)
const dispatch = useDispatch()
let authStatus = useSelector((state)=> state.auth.status)
let authData = useSelector((state)=> state.auth.userData)

useEffect(() => {
try {
  let userData=  authService.getCurrentUser().then(async(user) => {
    await service.getUserDocs({uid: user.uid})
    .then((data)=>{
      if (user !== null) {
        dispatch(login(Object(data.data())))
    }else {
      console.log(userData);
      dispatch(logout())
    }
    setLoading(false)
    })
    
 
  })
  
  
  
} catch (error) {
  setLoading(false)
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
