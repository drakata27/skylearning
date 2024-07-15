import './HomePage.css'

import React, {useState, useEffect, useContext} from 'react'
import SectionItem from '../../Components/SectionItem/SectionItem'
import AuthContext from '../../context/AuthContext'
import { Link } from 'react-router-dom'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";


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
  const url = 'http://127.0.0.1:8000/api/section/'

  const {user} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  let getSections = async ()=>{
    let response = await fetch(url)
    let data = await response.json()
    setSections(data)
  }
  useEffect(()=>{
    getSections()
  },[])

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