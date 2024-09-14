import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import BASE_URL from '../utils/config'

const PrivateRoute = () => {
    let { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

const EditRoute = () => {
    let { user } = useContext(AuthContext);
    let location = useLocation();

    const [section, setSection] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSection = async () => {
            const pathSegments = location.pathname.split('/');
            const id = pathSegments[pathSegments.indexOf('learning') + 1];
            if (!id) {
                setLoading(false);
                return;
            }

            const urlSection = `${BASE_URL}/api/section/${id}/`;

            try {
                const response = await fetch(urlSection);
                if (!response.ok) {
                    console.error('Error fetching section data:', response.status, response.statusText);
                    setLoading(false);
                    return;
                }
                const data = await response.json();
                setSection(data);
                setLoading(false);
            } catch (error) {
                alert("Error fetching details: " + error);
                setLoading(false);
            }
        };

        fetchSection();
    }, [location.pathname]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!section) {
        return <Navigate to="/unauthorized" />;
    }

    if (user.user_id !== section.user) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export { PrivateRoute, EditRoute };