    import React, { useEffect, useState } from 'react'
    import {FaChevronLeft, FaChevronRight, FaPlusCircle} from "react-icons/fa"


    function Carousal({ children: slides,
    autoSlide = false,
    autoSlideInterval= 5000
    } ) {
    const [current, setCurrent] = useState(0)

    const prev = ()=> setCurrent((current)=> (current === 0? slides.length-1 : current-1))

    const next = ()=> setCurrent((current)=> (current === slides.length-1? 0 : current+1))

    useEffect(()=>{
    if(!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)

    return ()=> clearInterval(slideInterval)

    },[slides.length, current])
    return (
    <>
    <div className=' overflow-hidden relative  '>
    <div className=" flex min-w-full object-cover aspect-[16/9] transition-transform ease-out duration-500" style={{transform: `translateX(-${current * 100}%)`}}>{slides}</div>

    <div className='absolute z-[0] top-[35%]  left-0 w-full flex items-center justify-between p-4'>
    <button onClick={prev} className=' w-[30px]  h-[30px] items-center justify-center p-1 rounded-full shadow bg-white opacity-[70%]'>
    <FaChevronLeft className=' m-auto'/>
    </button>
    <button onClick={next} className=' w-[30px]  h-[30px] items-center justify-center p-1 rounded-full shadow bg-white opacity-[70%]'>
    <FaChevronRight className=' m-auto'/>
    </button>
    </div>
    <div className=" absolute bottom-4 right-0 left-0">
    <div className=" flex items-center justify-center gap-2">
    {slides.map((_, i)=> (
    <div onClick={()=>setCurrent(i)} className={` cursor-pointer transition-all w-2 h-2 md:w-3 md:h-3 bg-white rounded-full ${current === i? "p-1.5 md:p-2":"bg-opacity-50"}`}/>
    ))}
    </div>
    </div>
    </div>
    </>
    )
    }

    export default Carousal
