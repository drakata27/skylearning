import './HomePage.css'

import React, {useState, useEffect} from 'react'
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
        <h1>Home</h1>      
        <div className="section-item">
          {sections.map((section, index) => (
            <SectionItem key={index} section={section} refreshSection={getSections}/>
          ))}
        </div>
      

    </div>
  )
}

export default HomePage