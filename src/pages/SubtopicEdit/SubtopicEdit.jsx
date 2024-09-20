import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Placeholder from '../../assets/placeholder.jpg'
import Uploader from '../../Components/Uploader/Uploader'

import 'react-quill/dist/quill.snow.css';
import modules from '../../utils/quilModules'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BASE_URL from '../../utils/config'

import './SubtopicEdit.css'
import AuthContext from '../../context/AuthContext';

const SubtopicEdit = () => {
    let {id, matId, topicId} = useParams();
    const [cover, setCover] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const {user} = useContext(AuthContext)
    const [subtopic, setSubtopic] = useState({
        user: user.user_id,
        'title': '',
        'subtitle': '',
        'body': '',
        'cover': cover,
        'topic': topicId
    })

    const navigate = useNavigate();

    const url = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic/${matId}/edit/`
    const urlFetch = `${BASE_URL}/api/section/${id}/topic/${topicId}/subtopic/${matId}/`

    useEffect(()=>{
        const fetchSubtopicDetails = async () => {
            try {
                const response = await fetch(urlFetch);
                if (!response.ok) {
                    console.error('Error fetching subtopic data:', 
                    response.status, response.statusText);
                    return
                }
                const data = await response.json();
                setSubtopic(data)
            } catch(error) {
                alert("Error fetching details: " + error)
            }
        }
        fetchSubtopicDetails()
    }, [urlFetch])

    useEffect(() => {
        if (subtopic.body) {
            setIsLoaded(true);
        }
    }, [subtopic.body]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubtopic({ ...subtopic, [name]: value });
    };

    const updateSubtopic = async () => {
        const formData = new FormData()
        formData.append('user', user.user_id);
        formData.append('title', subtopic.title);
        formData.append('subtitle', subtopic.subtitle);
        formData.append('body', subtopic.body);
        formData.append('topic', topicId);

        if (cover) {
            formData.append('cover', cover);
        }

        try {
            const response = await fetch(url, {
            method: "PUT",
            body: formData
        });

        if (!response.ok) {
            console.error('Error updating subtopic. Server responded with:',
            response.status, response.statusText);
            return;
        }

            const data = await response.json();
            setSubtopic(data)
            navigate(`/learning/${id}/topic/${topicId}/material/${matId}`)
        } catch (error) {
            console.error('Error updating subtopic:', error);
        }
    }

    const [inputKey] = useState(Date.now()); 

    let imagePath = 'No cover'

    if (subtopic.cover) {
        imagePath = subtopic.cover
    }

    const getImageName = (path) => {
        const parts = path.split('/');
        return parts[parts.length - 1];
    };

    const imageName = getImageName(imagePath);

    const cancel = () => {
        navigate(-1)
    }
    
  return (
    <div className='subtopic-edit-container'>
        <h1>{subtopic.title}</h1>
        <div className="section-form">
            <div className="cover-preview">
                

                <h1>Current Cover</h1>
                { subtopic.cover ? 
                    <img src={ subtopic.cover} alt="section cover" />
                    :
                    <img src={Placeholder} alt="section cover" />
                }
                <section className='uploaded-row'>
                    <p>{imageName}</p>
                </section>
            </div>

            <div className="horizontal-container cover-container">
                <Uploader inputKey={inputKey} setCover={setCover} />
            </div>

            <input
                className='section-title-input'
                type='text'
                name='title'
                placeholder='Title...'
                value={subtopic.title}
                onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'title' } })}
            />

            <input
                className='section-subtitle-input'
                type='text'
                name='subtitle'
                placeholder='Subitle...'
                value={subtopic.subtitle}
                onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'subtitle' } })}
            />

            <ReactQuill 
              className='editor-input'
              modules={modules}
              theme="snow" 
              value={subtopic.body} 
              placeholder='Type here...'
              onChange={body => {
                if (isLoaded) {
                        handleInputChange({ target: { value: body, name: 'body' } });
                    }
                }}
            />

            <button 
                className='section-add-btn'
                onClick={updateSubtopic}>
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

export default SubtopicEdit