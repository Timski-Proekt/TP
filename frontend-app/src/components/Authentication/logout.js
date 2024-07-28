import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8080/api/auth/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return logout;
};

export default useLogout;
