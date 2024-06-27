import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './SubtopicAdd.css'

import modules from '../../utils/quilModules'
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
            <h1>Add Material</h1>

            <div className="section-form">
          <div className="horizontal-container cover-container">
            <p>Cover</p>
            <input 
                className='section-cover-input'
                type='file' 
                accept='image/*' 
                key={inputKey} 
                value={undefined} 
                onChange={(e)=> setCover(e.target.files[0])}
            />

            <button
              className='clear-img-btn' 
              onClick={clearImage}
              >Clear</button>
          </div>

          <input
              className='section-title-input'
              type='text'
              name='title'
              placeholder='Title...'
              value={subtopic.title}
              onChange={handleInputChange}
          />
          <input
              className='section-subtitle-input'
              type='text'
              name='subtitle'
              placeholder='Subitle...'
              value={subtopic.subtitle}
              onChange={handleInputChange}
          />


          <ReactQuill 
            className='editor-input'
            modules={modules}
            theme="snow" 
            value={subtopic.body} 
            placeholder='Type here...'
            onChange={body => handleInputChange({ target: { value: body, name: 'body' } })}
        />
        
          <button 
            className='section-add-btn'
            onClick={handleSubmit}>
              Done
          </button>

          <button 
            className='section-cancel-btn'
            onClick={cancel}
          >
            Cancel
          </button>
        </div>

        </div>
    )
}

export default SubtopicAdd