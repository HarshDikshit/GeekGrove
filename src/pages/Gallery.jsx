import React from 'react'
import { Carousal, FileUpload, Toggle } from '../components'


function Gallery() {
 
  return (
<>
    <div className=" w-full m-auto dark:bg-slate-600">
      {/* box */}
      <div className=" flex m-auto justify-center items-center ">
      <div className=' w-[80%] mx-4 my-2 rounded-md shadow-black shadow-sm p-2 dark:bg-slate-700'>
        {/* items */}
        <div className=' flex items-center'>
          {/* avatar */}
        <div>
        <div className=" rounded-full border-[3px] border-slate-400 w-8 h-8 "></div>
        </div>

        {/* name */}
        <div>
        <div className=' text-black dark:text-slate-300 font-semibold mx-2 flex justify-center items-center '> Name</div>
        </div>

        {/* email */}
        <div>
        <div className=' text-black dark:text-slate-300 font-semibold mx-2 flex justify-center items-center '> email@gmail.com</div>
        </div>

        {/* admin-ctrl-btn */}
        <div>
        <Toggle/>
        </div>

         {/* verify-ctrl-btn */}
         <div>
        <Toggle/>
        </div>

         {/* active-ctrl-btn */}
         <div>
        <Toggle/>
        </div>
        </div>
      </div>
      </div>
    </div>
   
    </>
  )
}

export default Gallery
