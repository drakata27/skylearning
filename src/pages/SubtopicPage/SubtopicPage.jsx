import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.jpg'

import './SubtopicPage.css'
import BackButton from '../../Components/BackButton/BackButton'
import BASE_URL from '../../utils/config'

const SubtopicPage = () => {
  let {id, topicId, matId} = useParams();
  const [cover] = useState()
  const [subtopic, setSubtopic] = useState({
    title: '',
    subtitle: '',
    body: '',
    cover: cover,
  })

  const navigate = useNavigate();
  const urlFetch = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic/${matId}/`
  const url = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic/${subtopic.id}`

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
                
                <div className='title-container'>
                    <h1 className='title'>{subtopic?.title}</h1>
                </div>

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
            </div>


        <h2>{ subtopic.subtitle }</h2>

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


    </div>
  )
}

export default SubtopicPage