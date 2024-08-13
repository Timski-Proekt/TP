import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const API_BASE_URL = 'http://localhost:8080';
const stripePromise = loadStripe('pk_test_51PkmjO1UiNUnWFHXaKBdEKfahMaoXz5O2QXWmKYtW7nN5vxsznKCac39T1qUwXrYIFmOREzshN4KAjf9XKEq9BNn00qMVRZLA0');

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const bookAppointment = async (appointmentId, embg) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/appointments/booked`, null, {
            params: { appointmentId, embg },
            headers: getAuthHeaders(),
        });
        if (!response.status === 200) {
            throw new Error('Failed to book appointment.');
        }
        return response.data;
    } catch (error) {
        console.error('Error booking appointment:', error);
        throw error;
    }
};

export const createCheckoutSession = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-checkout-session`, null, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating checkout session:', error);
        throw error;
    }
};

export const redirectToStripeCheckout = async (sessionId) => {
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({ sessionId });
    if (result.error) {
        console.error(result.error.message);
        throw new Error(result.error.message);
    }
};
