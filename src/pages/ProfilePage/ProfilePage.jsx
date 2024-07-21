import { useContext, useState, useEffect} from 'react'
import React from 'react'
import './ProfilePage.css'
import AuthContext from '../../context/AuthContext'
import User  from '../../assets/user.png'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ProfilePage = () => {
    useGSAP(()=> {
        gsap.to('.profile-container>h1', {
          opacity: 1,
          delay: 0.2
        })
      
        gsap.to('.profile-image-container', {
          opacity: 1,
          y: -23,
          delay: 0.2
        })
        
        gsap.to('.table-container', {
          opacity: 1,
          y: -23,
          delay: 0.2
        })
        
        gsap.to('.profile-container p', {
          opacity: 1,
          y: -23,
          delay: 0.2
        })
      }, [])


    const {user} = useContext(AuthContext)
    const url = `http://127.0.0.1:8000/api/${user.username}/`


    let [profile, setProfile] = useState({
        full_name: "",
        bio: "",
        image: "",
        verified: false,
    })

    useEffect(()=> {
        const getProfiles = async () => {
            let response = await fetch(url)
            let data = await response.json()
            setProfile(data)
        }
        getProfiles()
    },[url])

    console.log(profile.image);

  return (
    <div className="profile-container">
        <h1 style={{opacity:0}}>Profile</h1>
        <div className="profile-image-container" style={{opacity:0}}>
            {profile.image === '/media/default.jpg' ? 
                <img src={User} alt="user" />
                :
                <img 
                    src={'http://127.0.0.1:8000/'+ profile.image} 
                    alt='user'
                    style={{borderRadius: '40px'}}/>
            }
        </div>
        <div className="table-container" style={{opacity:0}}>
            <table className='profile-table'>
                <tbody>
                <tr>
                    <td>Username</td>
                    <td>{user.username} { 
                        profile.verified ? 
                        <span class="material-symbols-outlined" style={{color: 'lightblue'}}>
                            verified
                        </span> : <></> }</td>
                </tr>
                <tr>
                    <td>Full Name</td>
                    <td>{profile.full_name}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <p style={{opacity:0}}>{profile.bio}</p>
    </div>
  )
}

export default ProfilePage