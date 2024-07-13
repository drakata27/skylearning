import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SectionEdit.css'
import Placeholder from '../../assets/placeholder.jpg'
import Uploader from '../../Components/Uploader/Uploader'

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
    const cancel = () => {
        navigate('/learning')
    }

    const [inputKey] = useState(Date.now()); 

    let imagePath = 'No cover'

    if (section.cover) {
        imagePath = section.cover
    }

    const getImageName = (path) => {
        const parts = path.split('/');
        return parts[parts.length - 1];
    };

    const imageName = getImageName(imagePath);

    return (
        <div className='edit-container'>
            <h1>{section.title}</h1>
            <div className="section-form">

                <div className="cover-preview">
                    <h1>Current Cover</h1>
                    { section.cover ? 
                        <img src={'http://127.0.0.1:8000/' + 
                            section.cover} alt="section cover" />
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