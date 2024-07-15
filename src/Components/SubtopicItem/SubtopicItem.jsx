import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.png'

const SubtopicItem = ({topic, subtopic, refreshSubtopic}) => {
  const swal = require('sweetalert2')
  const {id, topicId} = useParams()
  const url = `http://127.0.0.1:8000/api/section/${id}/topic/${topic.id}/subtopic/${subtopic.id}`
  const token = localStorage.getItem("authTokens")
  const navigate = useNavigate();

  let deleteSubtopic = async (e) => {
    e.preventDefault()
    const result = await swal.fire({
        title: `Are you sure you want to delete material "${subtopic.title}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    });
    if (result.isConfirmed) {
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
        swal.fire({
            title: `Material "${subtopic.title}" was deleted`,
            icon: 'success',
            toast: 'true',
            timer: 2000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
        })
        refreshSubtopic()
        navigate(`/learning/${id}/topic/${topicId}/`)
        } catch(error) {
            console.error('Error deleting subtopic:', error);
        }
        
    }
}

  return (
    <Link to={`/learning/${id}/topic/${topic.id}/material/${subtopic.id}/`}>
        <div className="section-item-container horizontal-container">
        <div className='section-item-cover'>
            { subtopic.cover ? 
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
    </Link>
  )
}

export default SubtopicItem