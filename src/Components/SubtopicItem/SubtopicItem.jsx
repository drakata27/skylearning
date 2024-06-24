import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.jpg'

const SubtopicItem = ({topic, subtopic, refreshSubtopic}) => {
  const {id} = useParams()
  const url = `http://127.0.0.1:8000/api/section/${id}/topic/${topic.id}/subtopic/${subtopic.id}`
  const token = localStorage.getItem("authTokens")

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
        refreshSubtopic()
        } catch(error) {
            console.error('Error deleting subtopic:', error);
        }
    }
    e.preventDefault()
}

  return (
    <div className="section-item-container horizontal-container">
      <div className='section-item-cover'>
          { topic.cover ? 
              <img src={'http://127.0.0.1:8000/' + subtopic.cover} alt="subtopic cover" />:
              <img src={Placeholder} alt="subtopic cover" />
          }
      </div>
      
      <div className='section-item-content'>
          <h2>{subtopic.title}</h2>
          <h3>{subtopic.subtitle}</h3>
      </div>

      { token ? 
      <>
          <div className='section-item-btns'>
              <Link to={`/learning/${id}/topic/${topic.id}/material/${subtopic.id}/edit/`}>
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
      </>:<div></div>
      }
  </div>
  )
}

export default SubtopicItem