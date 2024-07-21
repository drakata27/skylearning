import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import './LoginPage.css'

import { FaUser, FaLock } from 'react-icons/fa'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LoginPage = () => {
  useGSAP(()=> {
    gsap.to('.login-container', {
      y: -23,
      opacity: 1,
      delay: 0.2
    })
  }, [])

  const {loginUser} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
    } catch (error) {
    }
  };

  return (
    <div className="login-container" style={{opacity:0}}>
      <div className='login-wrapper'>
          <h1>Login</h1>
          <form action="" onSubmit={handleSubmit}>
              <div className="login-input-box">
                  <input type="email" name='email' placeholder='Email' required/>
                  <FaUser className='login-icon'/>
              </div>
              <div className="login-input-box">
                  <input type="password" name='password' placeholder='Password' required/>
                  <FaLock className='login-icon'/>
              </div>

              <button type='submit'>Login</button>

              <div className="register-link">
                  <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
              </div>
          </form>
      </div>

    </div>

  )
}

export default LoginPage