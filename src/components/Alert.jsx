import React, { useEffect, useState } from 'react'
import {FaXmark} from 'react-icons/fa6'

function Alert({
  children,
  className='',
  title,
  isOpen,
  ...props
}) {


const [alert, setAlert] = useState(children)


return (
  
      <>
      <div className={`${children? "block": "hidden"} ${className} flex justify-between  rounded-md border-[2px] mb-2`}>
    <div className=' mx-auto'>
    {children !== "" && children}
    </div>
    <div {...props} className=' flex  self-end mx-4 text-lg justify-center items-center cursor-pointer' {...props} > <FaXmark/></div>
    </div>
      </>
)
}

export default Alert
