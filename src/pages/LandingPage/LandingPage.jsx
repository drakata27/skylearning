import { Link } from 'react-router-dom'
import './LandingPage.css'
import LandingImage from '../../assets/landing.png'

import React from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LandingPage = () => {
    useGSAP(()=> {
        gsap.to('.motto', {
          opacity: 1,
          delay: 0.3
        })
      
        gsap.to('.demo-img', {
          opacity: 1,
          y: -20,
          delay: 0.2
        })
      }, [])

  return (
    <div className='landing-section'>
        <div className='motto'>
            <p>Where people</p>
            <p>Learn together</p>
            <p>We know how hard it is to constantly upskill. It doesn’t have to be.
            Organise your learning materials for improved productivity</p>
            <p style={{ color: 'rgb(188, 187, 179);'}}>
              👉

              <Link to={'/login'} className='login'>
                Login
              </Link>
              to add materials
            </p>   
            <img className='demo-img' src={LandingImage} alt="Demo" />
        </div>
    </div>
  )
}

export default LandingPage