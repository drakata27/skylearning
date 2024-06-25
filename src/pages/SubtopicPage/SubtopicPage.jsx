import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Placeholder from '../../assets/placeholder.jpg'

import './SubtopicPage.css'

const SubtopicPage = () => {
  let {id, topicId, matId} = useParams();
  const [cover] = useState()
  const [subtopic, setSubtopic] = useState({
    title: '',
    subtitle: '',
    body: '',
    cover: cover,
  })

  const urlFetch = `http://127.0.0.1:8000/api/section/${id}/topic/${topicId}/subtopic/${matId}/`

    useEffect(()=>{
        const fetchSubtopicDetails = async () => {
            try {
                const response = await fetch(urlFetch);
                if (!response.ok) {
                    console.error('Error fetching subtopic data:', 
                    response.status, response.statusText);
                    return
                }
                const data = await response.json();
                setSubtopic(data)
            } catch(error) {
                alert("Error fetching details: " + error)
            }
        }
        fetchSubtopicDetails()
    }, [urlFetch])

  return (
    <div className='subtopic-container'>
        <div className="horizontal-container">
                <Link 
                    to={`/learning/${id}/topic/${topicId}/`}
                    className='back-btn'>
                    <span class="material-symbols-outlined">
                        arrow_back
                    </span>
                </Link>
                
                <div>
                    <h1 className='title'>{subtopic?.title}</h1>
                </div>

                <div></div>
            </div>


        <h2>{ subtopic.subtitle }</h2>

        <div className="cover-preview">
          { subtopic.cover ? 
              <img src={'http://127.0.0.1:8000/' + 
                  subtopic.cover} alt="section cover" />
              // <img src={section.cover} alt="section cover" />
              :
              <img src={Placeholder} alt="subtopic cover" />
          }
        </div>

        <div 
          className='ql-editor' 
          style={{ border: 'none' , marginBottom: "6rem"}}
          dangerouslySetInnerHTML={{__html:subtopic?.body}}>
        </div>

    </div>
  )
}

export default SubtopicPage