import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './SubtopicAdd.css'

// import modules from '../utils/quilModules'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SubtopicAdd = () => {
    const { id } = useParams();
    const { topicId } = useParams();
    const navigate = useNavigate();
    
    const [cover, setCover] = useState()
    const [subtopic, setSubtopic] = useState({
        title: '',
        subtitle: '',
        body: '',
        cover: cover,
    })

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubtopic({ ...subtopic, [name]: value });
    };

    const createSubtopic = async () => {
        try {
            const formData = new FormData();
            formData.append('title', subtopic.title);
            formData.append('subtitle', subtopic.subtitle);
            formData.append('body', subtopic.body)
            if (cover) {
                formData.append('cover', cover);
            } else {
                formData.append('cover', '');
            }

            const url = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}/subtopic/`
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                console.error('Error creating subtopic. Server responded with:', response.status, response.statusText);
                alert("Error creating subtopic")
                return;
            }
            navigate(`/learning/${id}/topic/${topicId}/`)

        } catch (error) {
            console.error('Error creating topic:', error);
            alert('Error creating topic:', error)
        }
    }

    let handleSubmit = ()=> {
        if (subtopic.title.trim() !== '' &&
            subtopic.subtitle.trim() !== '') {
            createSubtopic();
        } else {
            alert("Subtopic contents cannot be empty")
        }        
    }
    
    const [inputKey, setInputKey] = useState(Date.now()); 

    const clearImage = () => {
    setInputKey(Date.now());
    }

    const cancel = () => {
    navigate(`/learning/${id}/topic/${topicId}/`)
    }

    return (
        <div className='subtopic-add-container'>
            <h1>Add Study Material</h1>

        </div>
    )
}

export default SubtopicAdd