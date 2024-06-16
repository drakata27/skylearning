import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.jpg'

const TopicItem = ({topic, refreshTopic}) => {
    const {id} = useParams()
    const url = `http://127.0.0.1:8000/api/section/${id}/topic/${topic.id}`
    const token = localStorage.getItem("authTokens")

    let deleteTopic = async (e) =>{
        const isConfirmed = window.confirm(`Are you sure you want to 
        delete topic "${topic.title}"?`);
        if (isConfirmed) {
            try {
                const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }) 
    
            if (!response.ok) {
                console.error('Error deleting Topic. Server responded with:', 
                    response.status, response.statusText);
                return
            }
            refreshTopic()
            } catch(error) {
                console.error('Error deleting topic:', error);
            }
        }
        e.preventDefault()
    }

  return (
    <Link to={`topic/${topic.id}/`}>
            <div className="section-item-container horizontal-container">
                <div className='section-item-cover'>
                    { topic.cover ? 
                        <img src={'http://127.0.0.1:8000/'+topic.cover} alt="topic cover" />:
                        <img src={Placeholder} alt="section cover" />
                    }
                </div>
                
                <div className='section-item-content'>
                    <h2>{topic.title}</h2>
                    <h3>{topic.subtitle}</h3>
                </div>

                { token ? 
                <>
                    <div className='section-item-btns'>
                        <Link to={`topic/${topic.id}/edit/`}>
                            <button className='section-edit-btn'>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </Link>

                        <button 
                            className='section-delete-btn'
                            onClick={deleteTopic}>
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

export default TopicItem