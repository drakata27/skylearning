import './SectionList.css'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import SectionItem from '../../Components/SectionItem/SectionItem'


const SectionList = () => {
  let [sections, setSections] = useState([])
  const token = localStorage.getItem("authTokens")
  const url = 'http://127.0.0.1:8000/api/section/'

  useEffect(()=>{
    let getSections = async ()=>{
      let response = await fetch(url)
      let data = await response.json()
      setSections(data)
    }
    getSections()
  },[])

  return (
    <div className="section-list-container">
      <div className='section-list-header horizontal-container'>
        <h1>My Learning</h1>
        { token !== null ?
        <Link className='add-section-btn' to='/section-add'>Add Section</Link>
        : <></> } 
      </div>

      { token === null ?
      <>
      <h2>Looks like you are not logged in</h2>
      <p>Log in or join for free</p>
      <div className="btns-container">
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
      </> :
      <>
        <div className="section-item">
          {sections.map((section, index) => (
            <SectionItem key={index} section={section}/>
          ))}
        </div>
      </>
      }


    </div>
  )
}

export default SectionList