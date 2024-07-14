import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Loader from "react-spinners/ScaleLoader";
import './LoginPage.css'

import { FaUser, FaLock } from 'react-icons/fa'

const LoginPage = () => {
  const {loginUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
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