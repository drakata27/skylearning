import React from 'react'
import UnauthImg from '../../assets/unauth.webp'
import './Unauthorized.css'

const Unauthorized = () => {
  return (
    <div style={{margin:'2rem'}}>
        <h1>Unauthorized</h1>
        <div className='unauth-content'>
            <p>You do not have access to view this page</p>
            <img src={UnauthImg} alt="unauthorized" />
        </div>
    </div>
  )
}

export default Unauthorized