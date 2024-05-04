import React, { useEffect, useState } from 'react'
import Toggle from '../Assets/Toggle'
import {FaUserCircle} from 'react-icons/fa'
import service from '../../Firebase/conf'
import ToggleVerify from '../Assets/ToggleVerify'
import Loading from '../Loading'



function AdUsersCtrl() {

  const [data,setData] = useState([])
  const [token,setToken] = useState('All')
  const [loading, setLoading] = useState(true)
  

  const userArr = async ()=>{
    try {
      const fetchData = await service.getDocs()
      setLoading(false)
      setData(fetchData);
    } catch (error) {
      console.log(error);
    } 
  }
 

useEffect( ()=> {
  userArr()
  
},[])
 
  return (
<>
<div className=" my-2">

<table className="table-fixed w-[90%] m-auto">
   
  <thead className=' w-full bg-slate-300 rounded-md'>
    <tr>
         {/* <div className=" w-full"> */}
      {/* <th>Avatar</th> */}
      <th>Full Name</th>
      <th>Email</th>
      <th>Roll No</th>
      <th>Admin</th>
      <th>Verify</th>
       {/* </div> */}
    </tr>
  </thead>
 
  <tbody>
     
    {data.map((data) =>{
     return(
    <tr className=' w-full odd:bg-gray-100 even:bg-white rounded-md'>

      {/* Avatar */}
        {/* <td> 
        <div>
        <div className="w-8 h-8 m-auto "><FaUserCircle className=' w-full h-full text-gray-400'/></div>
        </div>
        </td> */}
      
      <td>
         {/* name */}
         <div>
        <div className=' text-black font-semibold mx-2 flex justify-center items-center '>{data.name}</div>
        </div>
      </td>
      <td>
        {/* email */}
        <div>
        <div className=' text-black dark:text-slate-300 font-semibold mx-2 flex justify-center items-center '> {data.email}</div>
        </div>
      </td>
      <td>
        {/* roll */}
        <div>
        <div className=' text-black dark:text-slate-300 font-semibold mx-2 flex justify-center items-center '>{data.rollNo}</div>
        </div>
      </td>
      <td>
         {/* admin-ctrl-btn */}
         <div >
        <Toggle uid={data.uid} />
        </div>
      </td>
      <td>
         {/* verify-ctrl-btn */}
         <div >
        <ToggleVerify uid={data.uid} />
        </div>
      </td>
    </tr>
    )}
    )}
  </tbody>
</table>
<Loading text="Loading, please wait..." className={`${loading? 'block': 'hidden'} m-auto justify-center items-center`}/>
</div>
    </>
  )
}

export default AdUsersCtrl
