import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function AuthLayout({children, route="/"}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (authStatus === true){
                navigate(route)
            } else if (authStatus === false) {
                navigate("/login")
            }
        setLoader(false)
    }, [authStatus])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}