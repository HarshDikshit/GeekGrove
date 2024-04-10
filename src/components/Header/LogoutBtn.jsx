import React from 'react'
import {useDispatch} from 'react-redux'
import { logout as authLogout } from '../../store/authSlice'
import authService from '../../Firebase/auth'
 

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = async() => {
      try {
        await authService.logOut().then(() => {
          dispatch( authLogout())
      })
      } catch (error) {
        console.log(error);
      }
      
    }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
