import React from 'react'
import Logo from '../../assets/logo.png'
import './Footer.css'

const Footer = () => {
    let currentYear = new Date().getFullYear();
    return (
      <div className='footer' data-testid='footer'>
        <div className="vertical-container">
          <img className="logo"src={Logo} alt="logo" />
          <p>Copyright © {currentYear}</p>
        </div>
      </div>
    )
}

export default Footer