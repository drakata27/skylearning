import React, {useState, useEffect} from 'react'
import SectionItem from '../../Components/SectionItem/SectionItem'

const LearningPage = () => {
  let [sections, setSections] = useState([])
  const url = 'http://127.0.0.1:8000/api/section/'

  useEffect(()=>{
    let getSections = async ()=>{
      let response = await fetch(url)
      let data = await response.json()
      setSections(data)
    }
    getSections()
  })

  return (
    <div className="section-list-container">
        <h1>My Learning</h1>
        <div className="section-item">
          {sections.map((section, index) => (
            <SectionItem key={index} section={section}/>
          ))}
        </div>
    </div>
  )
}

export default LearningPage