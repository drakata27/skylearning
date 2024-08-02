import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import './SectionPage.css'
import TopicItem from '../../Components/TopicItem/TopicItem'
import AuthContext from '../../context/AuthContext'
import BackButton from '../../Components/BackButton/BackButton'
import BASE_URL from '../../utils/config'

const SectionPage = () => {
    let {user} = useContext(AuthContext)
    let {id} = useParams()
    const [section, setSection] = useState({
        title: '',
        subtitle: '',
        cover: null,
    })

    const [topics, setTopics] =  useState([])

    const url = `${BASE_URL}/api/section/${id}/`
    const urlTopic = `${BASE_URL}/api/section/${id}/topic/`

    useEffect(()=>{
        const getSection = async () => {
            if (id==='new') return
            let response = await fetch(url)
            let data = await response.json()
            setSection(data)
        }
        getSection()
    }, [url, id])

    useEffect(()=> {
        const getTopic = async () => {
            let response = await fetch(urlTopic)
            let data = await response.json()
            setTopics(data)
        }
        getTopic()
    }, [urlTopic])

    const getTopic = async () => {
        let response = await fetch(urlTopic)
        let data = await response.json()
        setTopics(data)
    }

    return (
    <div className='section-page-container'>
        <div className="horizontal-container">
            
            <BackButton />

            <div>
                <h1 className='title'>{section?.title}</h1>

                <div className='horizontal-container'>
                    <p className='topic-p'>Topics</p>
                </div>
            </div>

            { user && user.user_id === section.user ? 
                <Link className='add-section-btn' to='add/'>
                    <span class="material-symbols-outlined">
                        add
                    </span>
                </Link> : <p>{section.username}</p>
            }

        </div>
            <div className="topic-container">
                { topics.map((topic, index)=>(
                    <TopicItem key={index} section={section} topic={topic} refreshTopic={getTopic}/>
                ))}
            </div>
    </div>
    )
}

export default SectionPage