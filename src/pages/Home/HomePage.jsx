import './HomePage.css'

import React, {useState, useEffect, useContext} from 'react'
import SectionItem from '../../Components/SectionItem/SectionItem'
import AuthContext from '../../context/AuthContext'

const HomePage = () => {
  let [sections, setSections] = useState([])
  const url = 'http://127.0.0.1:8000/api/section/'

  const {user} = useContext(AuthContext)

  let getSections = async ()=>{
    let response = await fetch(url)
    let data = await response.json()
    setSections(data)
  }
  useEffect(()=>{
    getSections()
  },[])

  return (
    <div className="section-list-container home-container">
        <div className='horizontal-container' style={{marginTop: '2rem'}}>
          <h1>Home</h1>
          <p style={{ color: 'rgb(188, 187, 179);'}}>Hello, { user.username } 👋</p>      
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