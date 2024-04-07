
import { Header} from "./components"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home"
import {Outlet} from 'react-router-dom'


function App() {
 

  return (
    <>
    <div className=" min-h-screen content-between">
      
    <Header/>
    <Outlet/>
     {/* <Home/> */}
    <Footer/>
    </div>
    </>
  )
}

export default App
