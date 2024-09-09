import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.jpg'

import './SubtopicPage.css'
import BackButton from '../../Components/BackButton/BackButton'
import BASE_URL from '../../utils/config'
import AuthContext from '../../context/AuthContext'

const SubtopicPage = () => {
  let {id, topicId, matId} = useParams();
  const token = localStorage.getItem("authTokens")
  const {user} = useContext(AuthContext)
  const [cover] = useState()

  const [subtopic, setSubtopic] = useState({
    title: '',
    subtitle: '',
    body: '',
    cover: cover,
  })

  const [section, setSection] = useState({
    // user: user.user_id,
    // username: user.username,
    user: null,
    username: '',
    title: '',
    subtitle: '',
    cover: '',
  })

  const navigate = useNavigate();
  const urlFetchSection = `${BASE_URL}/api/section/${id}/`
  const urlFetch = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic/${matId}/`
  const url = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic/${subtopic.id}`

  useEffect(()=>{
    const fetchSectionDetail = async () => {
        try {
            const response = await fetch(urlFetchSection);
            if (!response.ok) {
                console.error('Error fetching section data:', 
                response.status, response.statusText);
                return
            }
            const data = await response.json();
            setSection(data)
        } catch (error) {
            alert("Error fetching details: " + error)
        }
    }
    fetchSectionDetail()
},[urlFetchSection])

    useEffect(()=>{
        const fetchSubtopicDetails = async () => {
            try {
                const response = await fetch(urlFetch);
                if (!response.ok) {
                    console.error('Error fetching subtopic data:', 
                    response.status, response.statusText);
                    return
                }
                const data = await response.json();
                setSubtopic(data)
            } catch(error) {
                alert("Error fetching details: " + error)
            }
        }
        fetchSubtopicDetails()
    }, [urlFetch])

    let deleteSubtopic = async (e) =>{
      const isConfirmed = window.confirm(`Are you sure you want to 
      delete subtopic "${subtopic.title}"?`);
      if (isConfirmed) {
          try {
              const response = await fetch(url, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
              }
          }) 
  
          if (!response.ok) {
              console.error('Error deleting Subtopic. Server responded with:', 
                  response.status, response.statusText);
              return
          }
          } catch(error) {
              console.error('Error deleting subtopic:', error);
          }
      }
      e.preventDefault()
      navigate(`/learning/${id}/topic/${topicId}/`)
    }

  return (
    <div className='subtopic-container'>
        <div className="horizontal-container">
                <BackButton />

                { token && section.user === user.user_id ? 
                    <div className='section-item-btns-subtopic'>
                        <Link to={`/learning/${id}/topic/${topicId}/material/${subtopic.id}/edit/`}>
                            <button className='section-edit-btn'>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </Link>

                        <button 
                            className='section-delete-btn'
                            onClick={deleteSubtopic}
                        >
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                        </button>
                    </div>
                :
                    <></>
                }
            </div>

        <div className='title-container'>
            <h1 className='title'>{subtopic?.title}</h1>
            <h2>{ subtopic.subtitle }</h2>
        </div>



        <div className="cover-preview">
            { subtopic.cover ? 
                <img src={subtopic.cover} alt="material cover" />
                :
                <img src={Placeholder} alt="material cover" />
            }
          <div 
            className='ql-editor' 
            style={{ border: 'none' , marginBottom: "6rem"}}
            dangerouslySetInnerHTML={{__html:subtopic?.body}}>
          </div>
        </div>

        <div className="flash-card-btns">
            <Link to={`/material/${matId}/flashcard`} className='btn-flash-card' style={{backgroundColor:'red'}}>My Flash Cards</Link>
            <Link to={`/material/${matId}/flashcard/add`} className='btn-flash-card'>Add Flash Card</Link>
            <Link className='btn-flash-card' style={{backgroundColor:'darkOrange'}}>Test</Link>
        </div>

    </div>
  )
}

export default SubtopicPage