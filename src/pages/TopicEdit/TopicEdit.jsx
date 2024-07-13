import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Placeholder from '../../assets/placeholder.jpg'
import Uploader from '../../Components/Uploader/Uploader'

const TopicEdit = () => {
    let {id} = useParams();
    let {topicId} = useParams();
    const [cover, setCover] = useState()
    const [topic, setTopic] = useState({
        'title': '',
        'subtitle': '',
        'cover': cover,
        'section': id
    })

    const url = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}/edit/`
    const urlFetch = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}/`
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTopicDetail = async () => {
            try {
                const response = await fetch(urlFetch);
                if (!response.ok) {
                    console.error('Error fetching topic data:', 
                    response.status, response.statusText);
                    return
                }
                const data = await response.json();
                setTopic(data)
            } catch (error) {
                alert("Error fetching details: " + error)
            }
        }
        fetchTopicDetail()
    },[urlFetch])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTopic({ ...topic, [name]: value });
    };

    const updateTopic = async () => {
        const formData = new FormData()
        formData.append('title', topic.title);
        formData.append('subtitle', topic.subtitle);
        formData.append('section', id);
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
            navigate(`/learning/${id}/`)
        } catch (error) {
            console.error('Error updating topic:', error);
        }
    }

    const cancel = () => {
        navigate(`/learning/${id}/`)
    }

    const [inputKey] = useState(Date.now()); 

    let imagePath = 'No cover'

    if (topic.cover) {
        imagePath = topic.cover
    }

    const getImageName = (path) => {
        const parts = path.split('/');
        return parts[parts.length - 1];
    };

    const imageName = getImageName(imagePath);


  return (
    <div>
        <h1>{topic.title}</h1>
        <div className="section-form">
            <div className="cover-preview">
                <h1>Current Cover</h1>
                { topic.cover ? 
                    <img src={'http://127.0.0.1:8000/' + 
                        topic.cover} alt="section cover" />
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
                value={topic?.title}
                onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'title' } })}
            />
            <input
                className='section-subtitle-input'
                type='text'
                name='subtitle'
                placeholder='Subitle...'
                value={topic?.subtitle}
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