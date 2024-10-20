import './SectionItem.css'
import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.png'
import AuthContext from '../../context/AuthContext'
import BASE_URL from '../../utils/config'
import ActionButton from '../ActionButton/ActionButton'

const SectionItem = ({section, refreshSection}) => {
    const {user} = useContext(AuthContext)
    const swal = require('sweetalert2')
    const navigate = useNavigate()
    
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

    const handleNavigation = (e) => {
        e.preventDefault();
        navigate(`/learning/${section.id}/edit/`)
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

                    { section.is_public ? 
                    <p className='privacy' style={{color: 'red'}}>Public</p> : <p style={{color: 'green'}} className='privacy'>Private</p>
                    }
                </div>

                { token && section.user === user.user_id ? 
                <>
                    <div className='section-item-btns'>
                        <ActionButton handleAction={handleNavigation} className={'section-edit-btn'} type={'edit'}/>
                        <ActionButton handleAction={deleteSection} className={'section-delete-btn'} type={'delete'}/>
                    </div>
                </>:<div></div>
                }

            </div>
        </Link>
    )
}

export default SectionItem