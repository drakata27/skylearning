import './SectionItem.css'
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.png'
import AuthContext from '../../context/AuthContext'
import BASE_URL from '../../utils/config'

const SectionItem = ({section, refreshSection}) => {
    const {user} = useContext(AuthContext)
    const swal = require('sweetalert2')
    
    const url = `${BASE_URL}/api/section/${section.id}/`
    const token = localStorage.getItem("authTokens")
    
    let deleteSection = async (e) =>{
        e.preventDefault()
        const result = await swal.fire({
            title: `Are you sure you want to delete section "${section.title}"?`,
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
                console.error('Error deleting Section. Server responded with:', response.status, response.statusText);
                return
            }
            swal.fire({
                title: `Section "${section.title}" was deleted`,
                icon: 'success',
                toast: 'true',
                timer: 2000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            })
            refreshSection()
            } catch(error) {
                console.error('Error deleting section:', error);
            }
        }
    }

    return (
        <Link to={`/learning/${section.id}/`}>
            <div className="section-item-container horizontal-container">
                <div className='section-item-cover'>
                    { section.cover ? 
                        <img src={section.cover} alt="section cover" />:
                        <img src={Placeholder} alt="section cover" />
                    }
                </div>
                
                <div className='section-item-content'>
                    <h2>{section.title}</h2>
                    <h3>{section.subtitle}</h3>
                    <p>By {section.username}</p>
                </div>

                { token && section.user === user.user_id ? 
                <>
                    <div className='section-item-btns'>
                        <Link to={`/learning/${section.id}/edit/`}>
                            <button className='section-edit-btn'>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                        </Link>

                        <button 
                            className='section-delete-btn'
                            onClick={deleteSection}>
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

export default SectionItem