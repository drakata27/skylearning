import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SectionEdit.css'
import Placeholder from '../../assets/placeholder.jpg'

const SectionEdit = () => {
    let {id} = useParams();
    const [cover, setCover] = useState()
    const [section, setSection] = useState({
        'title': '',
        'subtitle': '',
        'cover': cover,
    })

    const url = `http://127.0.0.1:8000/api/section/${id}/edit/`
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchSectionDetail = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    console.error('Error fetching section data:', 
                    response.status, response.statusText);
                    return
                }
                const data = await response.json();
                setSection(data)
            } catch (error) {
                alert("Error fetching details: " + error)
            }
        }
        fetchSectionDetail()
    },[url])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSection({ ...section, [name]: value });
    };

    const updateSection = async () => {
        const formData = new FormData()
        formData.append('title', section.title);
        formData.append('subtitle', section.subtitle);
        if (cover) {
            formData.append('cover', cover);
        }

        try {
            const response = await fetch(url, {
            method: "PUT",
            body: formData
        });

        if (!response.ok) {
            console.error('Error updating section. Server responded with:',
            response.status, response.statusText);
            return;
        }

            const data = await response.json();
            setSection(data)
            console.log('Section updated successfully:', data);
            navigate(`/learning`)
        } catch (error) {
            console.error('Error updating blog:', error);
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
          setSection({ ...section, cover: data.cover });
        }
        console.log('cover', cover);
    }

    

    const cancel = () => {
        navigate('/learning')
    }


    return (
        <div>
            <h1>{section.title}</h1>
            <div className="section-form">
                <div className="cover-preview">
                    { section.cover ? 
                        <img src={'http://127.0.0.1:8000/' + 
                            section.cover} alt="section cover" />
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
                    value={section.title}
                    onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'title' } })}
                />
                <input
                    className='section-subtitle-input'
                    type='text'
                    name='subtitle'
                    placeholder='Subitle...'
                    value={section.subtitle}
                    onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'subtitle' } })}
                />

                <button 
                    className='section-add-btn'
                    onClick={updateSection}>
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

export default SectionEdit