import React, {useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.png'
import AuthContext from '../../context/AuthContext'

const TopicItem = ({section, topic, refreshTopic}) => {
    const {user} = useContext(AuthContext)
    const swal = require('sweetalert2')
    const {id} = useParams()
    const url = `http://127.0.0.1:8000/api/section/${id}/topic/${topic.id}`
    const token = localStorage.getItem("authTokens")

    let deleteTopic = async (e) =>{
        e.preventDefault()
        const result = await swal.fire({
            title: `Are you sure you want to delete topic "${topic.title}"?`,
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
                console.error('Error deleting Topic. Server responded with:', 
                    response.status, response.statusText);
                return
            }
            swal.fire({
                title: `Topic "${topic.title}" was deleted`,
                icon: 'success',
                toast: 'true',
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            })
            refreshTopic()
            } catch(error) {
                console.error('Error deleting topic:', error);
            }
        }
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

                { token && section.user === user.user_id ? 
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