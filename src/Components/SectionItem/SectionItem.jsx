import './SectionItem.css'
import { Link } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.jpg'

const SectionItem = ({section}) => {
    return (
        <Link to={`section/${section.id}/topic/`}>
            <div className="section-item-container horizontal-container">
                <div className='section-item-cover'>
                    <img src={Placeholder} alt="section cover" />
                </div>
                
                <div className='section-item-content'>
                    <h2>{section.title}</h2>
                    <h3>{section.subtitle}</h3>
                </div>
            </div>
        </Link>
    )
}

export default SectionItem