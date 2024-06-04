import './SectionItem.css'
import { Link } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.jpg'

const SectionItem = ({section, refreshSection}) => {
    const url = `http://127.0.0.1:8000/api/section/${section.id}/`
    const token = localStorage.getItem("authTokens")
    
    let deleteSection = async (e) =>{
        const isConfirmed = window.confirm(`Are you sure you want to delete section "${section.title}"?`);
        if (isConfirmed) {
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
            refreshSection()
            } catch(error) {
                console.error('Error deleting section:', error);
            }
        }
        e.preventDefault()
    }

    return (
        <Link to={`/learning/${section.id}/`}>
            <div className="section-item-container horizontal-container">
                <div className='section-item-cover'>
                    { section.cover ? 
                        <img src={'http://127.0.0.1:8000/'+section.cover} alt="section cover" />:
                        <img src={Placeholder} alt="section cover" />
                    }
                </div>
                
                <div className='section-item-content'>
                    <h2>{section.title}</h2>
                    <h3>{section.subtitle}</h3>
                </div>

                { token ? 
                <>
                    <div className='section-item-btns'>
                        <Link to={`${section.id}/edit/`}>
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