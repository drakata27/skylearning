import React from 'react'
import {Link} from 'react-router-dom'

import { FaUser, FaLock } from 'react-icons/fa'

import './RegisterPage.css'

const RegisterPage = () => {
  return (
    <div className="register-container">
      <div className='register-wrapper'>
          <h1>Register</h1>
          <form action="">
              <div className="login-input-box">
                  <input type="text" name='username' placeholder='Username' required/>
                  <FaUser className='login-icon'/>
              </div>
              
              <div className="login-input-box">
                  <input type="email" name='email' placeholder='Email' required/>
                  <FaUser className='login-icon'/>
              </div>

              <div className="login-input-box">
                  <input type="password" name='password' placeholder='Password' required/>
                  <FaLock className='login-icon'/>
              </div>
              
              <div className="login-input-box">
                  <input type="password" name='password' placeholder='Confirm Password' required/>
                  <FaLock className='login-icon'/>
              </div>

              <button type='submit'>Register</button>

              <div className="login-link">
                  <p>Already have an account? <Link to={'/login'}>Login</Link></p>
              </div>
          </form>
      </div>

    </div>
  )
}

export default RegisterPage