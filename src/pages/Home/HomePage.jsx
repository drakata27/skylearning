import './HomePage.css'

import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import SectionItem from '../../Components/SectionItem/SectionItem'

const HomePage = () => {
  let [sections, setSections] = useState([])
  const url = 'http://127.0.0.1:8000/api/section/'

  let getSections = async ()=>{
    let response = await fetch(url)
    let data = await response.json()
    setSections(data)
  }
  useEffect(()=>{
    getSections()
  },[])

  return (
    <div className="section-list-container">
      <div className='section-list-header horizontal-container'>
        <h1>Home</h1>
        <Link className='add-section-btn' to='/section-add'>
          <span class="material-symbols-outlined">
            add
          </span>
        </Link>
      </div>      
        <div className="section-item">
          {sections.map((section, index) => (
            <SectionItem key={index} section={section} refreshSection={getSections}/>
          ))}
        </div>
      

    </div>
  )
}

export default HomePage