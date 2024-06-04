import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Placeholder from '../../assets/placeholder.jpg'

const TopicEdit = () => {
    let {id} = useParams();
    let {topicId} = useParams();
    const [cover, setCover] = useState()
    const [topic, setTopic] = useState({
        'title': '',
        'subtitle': '',
        'cover': cover,
    })

    const url = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}/edit/`
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchTopicDetail = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.error('Error fetching topic data:', 
                    response.status, response.statusText);
                    return
                }
                const data = await response.json();
                fetchTopicDetail(data)
            } catch (error) {
                alert("Error fetching details: " + error)
            }
        }
        fetchTopicDetail()
    },[url])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTopic({ ...topic, [name]: value });
    };

    const updateTopic = async () => {
        const formData = new FormData()
        formData.append('title', topic.title);
        formData.append('subtitle', topic.subtitle);
        if (cover) {
            formData.append('cover', cover);
        }

        try {
            const response = await fetch(url, {
            method: "PUT",
            body: formData
        });

        if (!response.ok) {
            console.error('Error updating topic. Server responded with:',
            response.status, response.statusText);
            return;
        }

            const data = await response.json();
            setTopic(data)
            console.log('Topic updated successfully:', data);
            navigate(`/learning/${id}/topic/`)
        } catch (error) {
            console.error('Error updating topic:', error);
        }
    }

    let uploadCover = async () => {
        const formData = new FormData();
        formData.append('cover', cover);
            
        const response = await fetch(url, {
          method: "PUT",
          body: formData,
        })
      
        if (cover) {
          const data = await response.json();
          setTopic({ ...topic, cover: data.cover });
        }
    }

    const cancel = () => {
        navigate(`/learning/${id}/topic/`)
    }


  return (
    <div>
        <h1>{topic.title}</h1>
        <div className="section-form">
            <div className="cover-preview">
                { topic.cover ? 
                    <img src={'http://127.0.0.1:8000/' + 
                        topic.cover} alt="section cover" />
                    // <img src={section.cover} alt="section cover" />
                    :
                    <img src={Placeholder} alt="section cover" />
                }
            </div>

            <div className="horizontal-container cover-container">
                <p>Cover</p>
                <input 
                    className='section-cover-input'
                    type='file' 
                    accept='image/*' 
                    // key={inputKey}
                    value={undefined} 
                    onChange={(e)=> setCover(e.target.files[0])}
                />

                <button
                    onClick={uploadCover}
                    className='section-add-btn'>
                    Upload
                </button>
            </div>

            <input
                className='section-title-input'
                type='text'
                name='title'
                placeholder='Title...'
                value={topic.title}
                onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'title' } })}
            />
            <input
                className='section-subtitle-input'
                type='text'
                name='subtitle'
                placeholder='Subitle...'
                value={topic.subtitle}
                onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'subtitle' } })}
            />

            <button 
                className='section-add-btn'
                onClick={updateTopic}>
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

export default TopicEdit