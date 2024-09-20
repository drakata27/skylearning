import React from 'react'
import './Unauthorized.css'

const Unauthorized = () => {
  return (
    <div style={{margin:'2rem'}}>
        <h1>Unauthorized</h1>
        <div className='unauth-content'>
            <p>You do not have access to view this page</p>   
            <img src='https://cloud-learn-bucket.s3.eu-west-2.amazonaws.com/assets/unauth.webp' alt="unauthorized" />
        </div>
    </div>
  )
}

export default Unauthorized