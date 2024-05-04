import React, { useState } from 'react'
import service from '../../Firebase/conf'

function SearchAdmin() {

    const [serch, setSearch] = useState("")
    const handleSearch =async(e)=>{
        setSearch(e.target.value)
        try {
            await service.getDocs({value: e.target.value})
        } catch (error) {
            
        }
    }
  return (
    <div className=' flex w-full  '>
    <input type="text" placeholder='Search here...' className=' m-auto ' onChange={handleSearch}/>
    </div>
  )
}

export default SearchAdmin
