import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './SectionPage.css'
import TopicItem from '../../Components/TopicItem/TopicItem'

const SectionPage = () => {
    let {id} = useParams()
    const [section, setSection] = useState({
        title: '',
        subtitle: '',
        cover: null,
    })

    const [topics, setTopics] =  useState([])

    const url = `http://127.0.0.1:8000/api/section/${id}/`
    const urlTopic = `http://127.0.0.1:8000/api/section/${id}/topic/`

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
        console.log('data topic',data);
        setTopics(data)
    }




    return (
    <div className='section-page-container'>
        <div className="horizontal-container">
            <h1>{section?.title}</h1>

            <Link className='add-section-btn' to='add/'>
                <span class="material-symbols-outlined">
                    add
                </span>
            </Link>
        </div>
            <div className="topic-container">
                { topics.map((topic, index)=>(
                    <TopicItem key={index} topic={topic} refreshTopic={getTopic}/>
                ))}
            </div>
    </div>
    )
}

export default SectionPage