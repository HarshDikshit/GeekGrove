import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Alert from '../Alert';
import service from '../../Firebase/conf';
import authService from '../../Firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { checkAdmin, disableAdmin } from '../../store/authSlice';


 

function ToggleVerify({uid,
                }) {

    const [enabled, setEnabled] = useState();

    const userData = useSelector((state) => state.auth.userData)
    


    useEffect(()=>{
        const en = authService.getCurrentUser().then(async(user)=> {
            await service.getUserDocs({uid: uid}).then(async(data)=> {
                setEnabled(data.data().checks.isVerify)
        })
    })                
    },[enabled]) 
        
     
        const authStatus = useSelector((state)=> state.auth.status)

        const dispatch = useDispatch()
    
        return (
            <div className="relative flex flex-col items-center justify-center  overflow-hidden">
                <div className="flex">
                    <label class="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={enabled}
                            readOnly
                        />
                        { ( <div
                            onClick={async() => {
                                {await authService.getCurrentUser().then(async(user)=> {
                                    if(enabled=== true)
                                    {
                                        await service.updateChecksDoc({uid: uid, checks: {isVerify: false,}, updatedAt: serverTimestamp()}) 
                                        
                                    }else{
                                        await service.updateChecksDoc({uid: uid, checks: {isVerify: true,}, updatedAt: serverTimestamp()})
                                        
                                    }
                                })}
                                setEnabled(!enabled);
                            }}
                            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                        ></div> )}
                        <span className="ml-2 text-sm font-medium text-gray-900">
                    
                        </span>
                    </label>
                </div>
            </div>
        );
    }
  
  export default ToggleVerify
