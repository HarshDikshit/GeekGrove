import React, { useEffect, useState } from 'react'

function Alert({
    children,
    className='',
    title,
    isOpen,
    ...props
}) {

  const [open, setOpen] =useState({isOpen})

 

 const handleOpen = () => {
 
  if(open){
    setOpen(false)
  }else{
    setOpen(true)
  }
 }
  return (
    <div
    class={` ${isOpen && open? 'block' : 'hidden'} border-b rounded-lg mb-2  text-sm p-4 flex justify-between ${className}`}
  >
    <div>
      <div class="flex items-center">
       
        <p>
          <span class="font-bold">{title}</span>
          {children}
        </p>
      </div>
    </div>
    <div onClick={handleOpen}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  </div>
  )
}

export default Alert
