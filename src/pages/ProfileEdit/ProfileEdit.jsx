import React, { useState } from 'react'
import './ProfileEdit.css'
import Placeholder from '../../assets/placeholder.jpg'
import Uploader from '../../Components/Uploader/Uploader'
import { useNavigate } from 'react-router-dom'

const ProfileEdit = () => {
    const [image, setImage] = useState()
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        'full_name': '',
        'bio': '',
        'image': image,
    })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const cancel = () => {
        navigate('/learning')
    }

    const [inputKey] = useState(Date.now()); 

    let imagePath = 'No Image'

    if (profile.image) {
        imagePath = profile.image
    }

    const getImageName = (path) => {
        const parts = path.split('/');
        return parts[parts.length - 1];
    };

    const imageName = getImageName(imagePath);

  return (
    <div className='edit-profile-container'>
        <h1>Edit</h1>
        <div className="section-form">

    <div className="cover-preview">
        <h1>Current Image</h1>
        { profile.image ? 
            <img src={
                profile.image} alt="section cover" />
            :
            <img src={Placeholder} alt="section cover" />
        }
        <section className='uploaded-row'>
            <p>{imageName}</p>
        </section>
    </div>

    <div className="horizontal-container cover-container">
        <Uploader inputKey={inputKey} setCover={setImage} />
    </div>

    <input
        className='section-title-input'
        type='text'
        name='title'
        placeholder='Full Name...'
        value={profile.full_name}
        onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'full_name' } })}
    />
    <textarea
        className='section-subtitle-input'
        type='text'
        name='subtitle'
        placeholder='Bio...'
        value={profile.bio}
        onChange={(e) => handleInputChange({ target: { value: e.target.value, name: 'bio' } })}
    />

    <button 
        className='section-add-btn'
        // onClick={updateSection}
    >
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

export default ProfileEdit