import React, { useState } from 'react'
import Alert from '../Alert';

function FileUpload() {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  return (
    <div>
      <input
      name="file-upload"
      type="file"
      accept="image/*"
      onChange={(event) => {
        if (event.target.files && event.target.files[0]) {
          if (event.target.files[0].size > 0.7 * 1000 * 1024) {
           setError("File with maximum size of 1MB is allowed")
            console.log("File with maximum size of 1MB is allowed");
            return false;
          }
            setError('')
          // do other operation
        }
      }}
    />
    <div className=' text-red-700'>
        {error !== '' && error }
    </div>
    </div>
  )
}

export default FileUpload
