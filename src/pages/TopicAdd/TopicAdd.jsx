import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Uploader from '../../Components/Uploader/Uploader'
import BASE_URL from '../../utils/config'

const TopicAdd = () => {
  const { id } = useParams();
  const [cover, setCover] = useState()
  const [topic, setTopic] = useState({
    title: '',
    subtitle: '',
    cover: cover,
  })

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTopic({ ...topic, [name]: value });
  };

  const createTopic = async () => {
    try {
        const formData = new FormData();
        formData.append('title', topic.title);
        formData.append('subtitle', topic.subtitle);
        if (cover) {
            formData.append('cover', cover);
        } else {
            formData.append('cover', '');
        }
        
        const url = `${BASE_URL}/api/section/${id}/topic/`
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });

      if (!response.ok) {
        console.error('Error creating topic. Server responded with:', response.status, response.statusText);
        alert("Error creating topic")
        return;
    }
    navigate(`/learning/${id}/`)
        
    } catch (error) {
      console.error('Error creating topic:', error);
      alert('Error creating topic:', error)
    }
  }

  let handleSubmit = ()=> {
    if (topic.title.trim() !== '' &&
        topic.subtitle.trim() !== '') {
        createTopic();
    } else {
        alert("Topic contents cannot be empty")
    }        
  }

  const [inputKey] = useState(Date.now()); 

  const cancel = () => {
    navigate(`/learning/${id}/`)
  }

  return (
    <div className='section-add-container'>
        <h1>Add Topic</h1>
        <div className="section-form">
          <div className="horizontal-container cover-container">
            <Uploader inputKey={inputKey} setCover={setCover}/>
          </div>

          <input
              className='section-title-input'
              type='text'
              name='title'
              placeholder='Title...'
              value={topic.title}
              onChange={handleInputChange}
          />
          <input
              className='section-subtitle-input'
              type='text'
              name='subtitle'
              placeholder='Subitle...'
              value={topic.subtitle}
              onChange={handleInputChange}
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

export default TopicAdd