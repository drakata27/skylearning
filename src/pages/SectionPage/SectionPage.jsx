import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SectionPage = () => {
    let {id} = useParams()
    const [section, setSection] = useState({
        title: '',
        subtitle: '',
        cover: null,
    })
    const url = `http://127.0.0.1:8000/api/section/${id}/`
    // const token = localStorage.getItem("authTokens")

    useEffect(()=>{
        const getSection = async () => {
            if (id==='new') return

            let response = await fetch(url)
            let data = await response.json()
            setSection(data)
        }
        getSection()
    }, [url, id])

    return (
    <div>
        <h1>{section?.title}</h1>
    </div>
    )
}

export default SectionPage