import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import './TopicPage.css'

const TopicPage = () => {
    let {id} = useParams()
    let {topicId} = useParams()
    const urlTopic = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}`

    const [topic, setTopic] = useState({
        title: '',
        subtitle: '',
        cover: null,
    })

    useEffect(()=>{
        const getTopic = async () => {
            if (id==='new') return
            let response = await fetch(urlTopic)
            let data = await response.json()
            setTopic(data)
        }
        getTopic()
    }, [urlTopic, id])

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

            <h1>{topic?.title}</h1>

            <Link className='add-section-btn' to=''>
                <span class="material-symbols-outlined">
                    add
                </span>
            </Link>
            </div>
        </div>
    )
}

export default TopicPage