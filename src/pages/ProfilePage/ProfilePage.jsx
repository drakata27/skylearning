import { useContext, useState, useEffect} from 'react'
import React from 'react'
import './ProfilePage.css'
import AuthContext from '../../context/AuthContext'

const ProfilePage = () => {
    const {user} = useContext(AuthContext)
    const url = 'http://127.0.0.1:8000/api/profiles/'
    let [profiles, setProfiles] = useState({
        full_name: "",
        bio: "",
        image: "",
        verified: false,
        user: user
    })

    useEffect(()=> {
        const getProfiles = async () => {
            let response = await fetch(url)
            let data = await response.json()
            setProfiles(data)
        }
        getProfiles()
    },[url])

    console.log(profiles.bio);

  return (
    <div className="profile-container">
        <h1>{user.username}</h1>
    </div>
  )
}

export default ProfilePage