import React, { useEffect, useState } from 'react'
import { setDarkTheme, setLightTheme } from '../../store/themeSlice'
import {useDispatch, useSelector} from 'react-redux'
import {FaRegMoon, FaRegSun} from 'react-icons/fa'

function ThemeBtn({className}) {

    const [lightMode, setLightMode] = useState(true)

    

    const click =() =>{
        setLightMode(!lightMode)
        if(lightMode === true){
            useDispatch(setDarkTheme())
        }else{
            useDispatch(setLightTheme())
        }
    }

    useEffect(()=> {
     
        document.querySelector('html').classList.remove("light", "dark")
        document.querySelector('html').classList.add(lightMode? "light" : "dark")
    }, [lightMode])

    

  return (
    <>
    <div className={`${className} w-[28px]`} onClick={click}>
    {lightMode ? ( <FaRegSun  className=' text-white'/>) :( <FaRegMoon className=' text-white'/>) }
    </div>
    </>
  )
}

export default ThemeBtn
