import './SectionList.css'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import SectionItem from '../../Components/SectionItem/SectionItem'


const SectionList = () => {
  let [sections, setSections] = useState([])
  const token = localStorage.getItem("authTokens")
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
        
        <div>
          <h1 className='title'>My Learning</h1>

          <div className='horizontal-container nav-elements'>
            <p className='section-p'>Sections</p>
          </div>
        </div>

        { token !== null ?
        <Link className='add-section-btn' to='add/'>
          <span class="material-symbols-outlined">
            add
          </span>
        </Link>
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
          { sections.map((section, index) => (
            <SectionItem key={index} section={section} refreshSection={getSections}/>
          ))}
        </div>
      </>
      }


    </div>
  )
}

export default SectionList