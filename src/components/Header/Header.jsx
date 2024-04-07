import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"

function Header() {
  const authStatus = true

  let [open, setOpen] = useState(false);

  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active:  !authStatus,
  },
  {
      name: "Admin",
      slug: "/admin-dashboard",
      active: true //authAdminStatus,
  },
  {
    name: "Gallery",
    slug: "/gallery",
    active: true,
},
  ]
  return (
    <div>
  
  


    <nav className=' flex shadow-md'> 
      <div className='md:flex flex z-[1]  h-12 relative justify-between  w-full shadow-md md:shadow-none bg-indigo-400 px-7
    items-center'>
  
      {/* logo goes here */}
    <div><img className='  h-10 w-10 rounded-full border-indigo-300 border-2' src="/logo/iert-logo.jpg" alt='logo' /></div>
      {/* logo ends here */}

      {/* hamburger icon goes here */}
    <div onClick={() => setOpen(!open)} className="hover:bg-indigo-300 md:hidden rounded-md cursor-pointer px-2">

        <a className="text-4xl rounded-md text-white">&#8801;</a>
      </div>
      {/* hamburger icon ends here */}
    </div>
    {/* nav items goes here */}
    <ul className= {`text-white md:py-0 py-6 pt-2 md:pt-0 md:flex md:items-center  ml-auto absolute md:static bg-indigo-400
      md:z-auto z-[0] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out md:rounded-b-none rounded-b-lg ${open? 'top-12': 'top-[-490px] ' } `}>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className=' md:inline-bock px-6 py-2 duration-500 hover:bg-blue-100 hover:text-indigo-400 rounded-full '
                >{item.name}</button>
              </li>
            ) : null
            )}

            {/* logout button goes here */}
            {authStatus && (
              <li>
              <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-indigo-400 rounded-full' onClick={() => navigate("/login")}>Logout</button>
              </li>
            )}
                {/* logout button ends here */}
          </ul>
              {/* nav items ends here */}

              </nav>
    </div>
  )
}

export default Header
