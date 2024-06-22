import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import './TopicPage.css'
import SubtopicItem from '../../Components/SubtopicItem/SubtopicItem'

const TopicPage = () => {
    let {id} = useParams()
    let {topicId} = useParams()
    const urlTopic = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}`
    const urlSubtopic = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}/subtopic`

    const [topic, setTopic] = useState({
        title: '',
        subtitle: '',
        cover: null,
    })

    const [subtopics, setSubtopics] =  useState([])

    useEffect(()=>{
        const getTopic = async () => {
            if (id==='new') return
            let response = await fetch(urlTopic)
            let data = await response.json()
            setTopic(data)
        }
        getTopic()
    }, [urlTopic, id])

    useEffect(()=> {
        const getSubtopic = async () =>{
            let response = await fetch(urlSubtopic)
            let data = await response.json()
            setSubtopics(data)
        }
        getSubtopic()
    }, [urlSubtopic])

    const getSubtopic = async () =>{
        let response = await fetch(urlSubtopic)
        let data = await response.json()
        setSubtopics(data)
    }

    return (
        <div className='topic-page-container'>
            <div className="horizontal-container">
                <Link 
                    to={`/learning/${id}`}
                    className='back-btn'>
                    <span class="material-symbols-outlined">
                        arrow_back
                    </span>
                </Link>
                
                <div>
                    <h1 className='title'>{topic?.title}</h1>

                    <div className='horizontal-container'>
                        <p className='section-p'></p>
                        <p className='topic-p'></p>
                        <p className='subtopic-p'>Materials</p>
                    </div>
                </div>

                <Link 
                    className='add-section-btn' 
                    to={`/learning/${id}/topic/${topicId}/add`}
                >
                    <span class="material-symbols-outlined">
                        add
                    </span>
                </Link>
            </div>
            <div className="topic-container">
                { subtopics.map((subtopic, index)=>(
                    <SubtopicItem 
                        key={index} 
                        topic={topic} 
                        subtopic={subtopic} 
                        refreshSubtopic={getSubtopic}/>
                ))}
            </div>
        </div>
    )
}

export default TopicPage