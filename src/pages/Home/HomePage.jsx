import './HomePage.css'

import React, {useState, useEffect, useContext} from 'react'
import SectionItem from '../../Components/SectionItem/SectionItem'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import BASE_URL from '../../utils/config'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback } from 'react'


const HomePage = () => {
  useGSAP(()=> {
    gsap.to('#home-heading', {
      opacity: 1,
      delay: 0.2
    })
  
    gsap.to('#home-item', {
      opacity: 1,
      y: -23,
      delay: 0.2
    })
  }, [])
  

  let [sections, setSections] = useState([])
  const url = `${BASE_URL}/api/public-section/`

  const {user} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  const getSections = useCallback(async () => {
    let response = await fetch(url);
    let data = await response.json();
    setSections(data);
  }, [url]);

  useEffect(() => {
    getSections();
  }, [getSections]);

  return (
    <div className="home-container section-list-container home-container">
        <div id='home-heading' className='horizontal-container' style={{marginTop: '2rem'}}>
          <h1>Home</h1>
          { token ? 
            <p style={{ color: 'rgb(188, 187, 179);'}}>Hello, { user.username } 👋</p>      
            :
            <p style={{ color: 'rgb(188, 187, 179);'}}>
              👉

              <Link to={'/login'} className='login'>
                Login
              </Link>
              to add materials
            </p>      
          }
        </div>

        <div id='home-item' className="section-item">
          {sections.map((section, index) => (
            <SectionItem key={index} section={section} refreshSection={getSections}/>
          ))}
        </div>
    </div>
  )
}

export default HomePage