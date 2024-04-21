import { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { Header} from "./components"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"
import {Outlet} from 'react-router-dom'
import authService from "./Firebase/auth"
import {login, logout} from './store/authSlice'


function App() {
const [loading, setLoading] = useState(false)
const dispatch = useDispatch()
let authStatus = useSelector((state)=> state.auth.status)
let authData = useSelector((state)=> state.auth.userData)

useEffect(() => {
try {
  let userData=  authService.getCurrentUser().then((user) => {
    if (user !== null) {
      dispatch(login(userData))
  }else {
    console.log(userData);
    dispatch(logout())
  }
  setLoading(false)
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
