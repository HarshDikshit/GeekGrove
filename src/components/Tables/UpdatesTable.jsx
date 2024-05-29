import React, { useEffect, useState } from 'react'
import Loading from '../Loading'
import postUploadService from '../../Firebase/post'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {FaDownload, FaPenToSquare, FaTrashCan} from 'react-icons/fa6'
import UploadForm from '../Forms/UploadForm'
import DeleteDialog from '../Dialogs/DeleteDialog'
import { FaPlusCircle } from 'react-icons/fa'



function UpdatesTable() {

    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [formStatus, setFormStatus] = useState(false)
    const [deleteDialog, setDeleteDialog] = useState({
        status: false,
        data: null
    })
    const adminStatus = useSelector((state)=>state.auth.isAdmin)
    const userf= useSelector((state)=>state.auth.userData)

    const handleEdit =()=>{
        setFormStatus(!formStatus)
    }

    
    const userArr = async ()=>{
        try {
        const fetchData = await postUploadService.getStudyDocs({token:'update'});
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
    <div className="rounded-md shadow-sm shadow-black pb-4  dark:bg-slate-700 ">
        <div className=' flex w-full p-2'>
            {/* heading */}
        <h2 className=' grow flex justify-center my-2 font-bold dark:text-slate-300'>Updates</h2>

        {/* create btn */}
        {adminStatus=== true && ( <div onClick={()=>{setFormStatus(!formStatus)}} className=' cursor-pointer  flex justify-center items-center text-white font-semibold bg-blue-500 p-2 rounded-md'>
            Create <FaPlusCircle className=' ml-2 text-white'/>
        </div>)}
       
        </div>
    <div className=' flex-wrap flex flex-col overflow-auto max-h-[250px]'>
    <table className="table-fixed w-[90%] m-auto">
    
    <thead className='bg-slate-300 dark:text-slate-300 dark:bg-slate-600 rounded-md'>
        <tr>
            {/* <div className=" w-full"> */}
        {/* <th>Avatar</th> */}
        
        <th>Title</th>
        <th>View</th>
        {adminStatus === true && (
            <>
            <th>Edit</th>
            <th>Delete</th>
            </>
        )}
        {/* </div> */}
        </tr>
    </thead>

    <UploadForm currentUser={Object(userf)} click={()=>setFormStatus(!formStatus)} className={` ${formStatus? 'block': 'hidden'}`}/>
    <DeleteDialog data={deleteDialog.data}  click={()=>setDeleteDialog(!deleteDialog.status)} className={` ${deleteDialog.status? 'block': 'hidden'}`}  />
    
    <tbody>
        
        
        {data.map((data) =>{
        return(
        <tr key={data.id} className=' w-full odd:bg-gray-100 even:bg-white dark:odd:bg-slate-500 dark:even:bg-slate-600 rounded-md'>
    
        
        
        <td className=' flex flex-wrap overflow-auto'>
            {/* title */}
            <div>
            <div className=' text-black dark:text-slate-300 font-semibold mx-2 flex justify-center items-center '>{data.post.title}</div>
            </div>
        </td>

        <td>
            {/* view btn */}
            <div>
            <div className=' cursor-pointer text-gray-600 font-semibold mx-2 flex justify-center items-center '>
            {data.post.file!=='' && (  <Link to={data.post.file} download><FaDownload className=' text-blue-700 dark:text-blue-400'/></Link> )}
                </div>
            </div>
        </td>

            {/* edit btn */}
        {adminStatus === true && (
        <td>
            <div onClick={handleEdit}>
            <div className=' cursor-pointer text-gray-600 font-semibold mx-2 flex justify-center items-center '>
                <FaPenToSquare className=' text-green-700'/>
                </div>
            </div>
        </td>
        )}

            {/* delete btn */}
        {adminStatus === true && (
        <td>
            <div onClick={()=> setDeleteDialog({status: !deleteDialog.status, data: data})}>
            <div className=' cursor-pointer text-gray-600 font-semibold mx-2 flex justify-center items-center '>
                <FaTrashCan className=' text-red-700'/>
                </div>
            </div>
        </td>
        )}

        </tr>
        )}
        )}
    </tbody>
    </table>
    {data.length===0 && (
        <div className=' m-auto dark:text-slate-300  '>
            No updates available...
        </div>
    )}
    <Loading text="Loading, please wait..." className={`${loading? 'block': 'hidden'} m-auto justify-center items-center dark:text-slate-300 `}/>
    </div>
    </div>
        </>
    )
    }
    
    
    

export default UpdatesTable
