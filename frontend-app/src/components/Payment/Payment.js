import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import PaymentForm from './PaymentForm';
import AppointmentInfo from './AppointmentInfo';

function Payment() {
    const [amount, setAmount] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        expiryDate: '',
        ccv: ''
    });
    const [appointmentData, setAppointmentData] = useState({
        date: "",
        type: "",
        location: "",
        time: "",
        category: "",
        appointmentId: ""
    });
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const appointmentData = Object.fromEntries(searchParams.entries());
        setAppointmentData(appointmentData);
        switch (appointmentData.type) {
            case 'TEORIJA':
                setAmount(2000);
                break;
            case 'POLIGON':
                setAmount(2500);
                break;
            case 'PRAKTICNO':
                setAmount(3000);
                break;
            default:
                setAmount(0);
        }
    }, [location.search]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:8080/user', config);
                setUserInfo(response.data);
                console.log('User Info:', response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setFormData({
            name: '',
            cardNumber: '',
            expiryDate: '',
            ccv: ''
        });
    };

    function getEmbgFromToken(token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.embg;
    }

    return (
        <div className="div-container text">
            <h1>Форма за плаќање</h1>
            <hr/>
            <section style={{padding: "30px 0px"}}>
                <PaymentForm
                    formData={formData}
                    amount={amount}
                    onChange={handleFormChange}
                    onSubmit={handleFormSubmit}
                />
                <AppointmentInfo appointmentData={appointmentData} />
            </section>
        </div>
    );
}

export default Payment;
