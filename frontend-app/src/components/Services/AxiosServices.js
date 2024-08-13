import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:8080';

const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

const apiRequest = async (endpoint, config) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, config);
        return response.data;
    } catch (error) {
        console.error(`Error during API request to ${endpoint}:`, error);
        throw error;
    }
};

export const fetchUserInfo = async () => {
    const config = {
        ...getAuthConfig(),
        params: { embg: jwtDecode(localStorage.getItem('token')).embg }
    };
    return apiRequest('/appusers/findInfoByEmbg', config);
};

export const fetchAppointmentsByUser = async () => {
    const config = {
        ...getAuthConfig(),
        params: { embg: jwtDecode(localStorage.getItem('token')).embg }
    };
    return apiRequest('/appointments/byEmbg', config);
};

export const fetchAppointments = async () => {
    return apiRequest('/appointments', getAuthConfig());
};
