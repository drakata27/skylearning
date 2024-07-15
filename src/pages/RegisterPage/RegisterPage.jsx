import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import { FaUser, FaLock } from 'react-icons/fa'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import './RegisterPage.css'

const RegisterPage = () => {
  useGSAP(()=> {
    gsap.to('.register-container', {
      y: -23,
      opacity: 1,
      delay: 0.2
    })
  }, [])

  const {registerUser} = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassowrd] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    registerUser(email, username, password, confirmPassword)
  }

  return (
    <div className="register-container" style={{opacity:0}}>
      <div className='register-wrapper'>
          <h1>Register</h1>
          <form action="" onSubmit={handleSubmit}>
              <div className="login-input-box">
                  <input type="email" name='email' placeholder='Email' required onChange={e => setEmail(e.target.value)}/>
                  <FaUser className='login-icon'/>
              </div>
              
              <div className="login-input-box">
                  <input type="text" name='username' placeholder='Username' required onChange={e => setUsername(e.target.value)}/>
                  <FaUser className='login-icon'/>
              </div>

              <div className="login-input-box">
                  <input type="password" name='password' placeholder='Password' required onChange={e => setPassword(e.target.value)}/>
                  <FaLock className='login-icon'/>
              </div>
              
              <div className="login-input-box">
                  <input type="password" name='password' placeholder='Confirm Password' required onChange={e => setConfirmPassowrd(e.target.value)}/>
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