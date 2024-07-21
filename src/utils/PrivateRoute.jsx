import { Navigate, Outlet, useParams} from 'react-router-dom'
import { useContext, useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    let {id} = useParams();
    
    const [section, setSection] = useState({
        // user: user.user_id,
        // username: user.username,
        user: null,
        username: '',
        title: '',
        subtitle: '',
        cover: '',
    })

    // const urlFetch = `http://127.0.0.1:8000/api/section/${id}/`
    const urlFetch = `http://127.0.0.1:8000/api/section/${id}/`
    
    useEffect(() => {
        if (user) {
            setSection(prevState => ({
                ...prevState,
                user: user.user_id,
                username: user.username,
            }));
        }
    }, [user]);
    
    useEffect(()=>{
        const fetchSectionDetail = async () => {
            try {
                const response = await fetch(urlFetch);
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
    },[urlFetch]) 

    // return user  && user.user_id === section.user ? 
    //     <Outlet /> : <Navigate to="/unauthorized" />;
    
    if (!user) {
        return <Navigate to="/unauthorized" />
    } else {
        return <Outlet />
    }

    // if (user.user_id === section.user) {
    //     return <Outlet />
    // } else {
    //     console.log('user.user_id',user.user_id );
    //     console.log('section.user',section.user );
    //     console.log('id', id );
    //     return <Navigate to="/unauthorized" />
    // }
}

export default PrivateRoute