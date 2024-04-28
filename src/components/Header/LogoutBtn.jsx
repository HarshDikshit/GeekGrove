import React from 'react'
import {useDispatch} from 'react-redux'
import { logout as authLogout, disableAdmin } from '../../store/authSlice'
import authService from '../../Firebase/auth'
 

function LogoutBtn({className=''}) {
    const dispatch = useDispatch()
    const logoutHandler = async() => {
      try {
        await authService.logOut().then(() => {
          dispatch( authLogout())
          dispatch(disableAdmin())
      })
      } catch (error) {
        console.log(error);
      }
      
    }

  return (
    <button
    className={`${className} inline-bock duration-200 `}
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
