import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './SectionAdd.css'

const SectionAdd = () => {
  const [cover, setCover] = useState()
  const [section, setSection] = useState({
    title: '',
    subtitle: '',
    cover: cover,
  })

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
};

  const createSection = async () => {
    try {
        const formData = new FormData();
        formData.append('title', section.title);
        formData.append('subtitle', section.subtitle);
        if (cover) {
            formData.append('cover', cover);
        } else {
            formData.append('cover', '/covers/default.jpg');
        }
        
        const url = `http://127.0.0.1:8000/api/section/`
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
      });

      if (!response.ok) {
        console.error('Error creating section. Server responded with:', response.status, response.statusText);
        alert("Error creating section")
        return;
    }

        
    } catch (error) {
      console.error('Error creating section:', error);
      alert('Error creating section:', error)
    }
  }

  let handleSubmit = ()=> {
    if (section.title.trim() !== '' &&
        section.subtitle.trim() !== '') {
        createSection();
        navigate('/learning')
    } else {
        alert("Section contents cannot be empty")
    }        
  }

  const [inputKey, setInputKey] = useState(Date.now()); 

  const clearImage = () => {
    setInputKey(Date.now());
  }

  return (
    <div className='section-add-container'>
        <h1>Section Add</h1>

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

            <button onClick={clearImage}>Clear</button>
          </div>

          <input
              className='section-title-input'
              type='text'
              name='title'
              placeholder='Title...'
              value={section.title}
              onChange={handleInputChange}
          />
          <input
              className='section-subtitle-input'
              type='text'
              name='subtitle'
              placeholder='Subitle...'
              value={section.subtitle}
              onChange={handleInputChange}
          />

          <button 
            className='section-add-btn'
            onClick={handleSubmit}>
              Done
            </button>
        </div>
    </div>
  )
}

export default SectionAdd