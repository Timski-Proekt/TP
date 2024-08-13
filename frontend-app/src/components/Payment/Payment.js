import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentInfo from './PaymentInfo';
import { fetchUserInfo } from '../Services/AxiosServices';
import { bookAppointment, createCheckoutSession, redirectToStripeCheckout } from '../Services/StripeServices';
import {jwtDecode} from "jwt-decode";

function Payment() {
    const [amount, setAmount] = useState(0);
    const [userInfo, setUserInfo] = useState(null);
    const [appointmentData, setAppointmentData] = useState({
        date: '',
        type: '',
        location: '',
        time: '',
        category: '',
        appointmentId: '',
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
        const fetchData = async () => {
            try {
                const userData = await fetchUserInfo();
                setUserInfo(userData);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchData();
    }, []);

    const handlePayment = async () => {
        try {
            const { appointmentId } = appointmentData;
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No token found');
            }

            const decodedToken = jwtDecode(token);
            const embg = decodedToken.embg;

            await bookAppointment(appointmentId, embg);
            const session = await createCheckoutSession();
            await redirectToStripeCheckout(session.id);
        } catch (error) {
            console.error('Error during payment process:', error);
        }
    };

    return (
        <div className="div-container text">
            <h1>Форма за плаќање</h1>
            <hr />
            <section style={{ padding: '30px 0px' }}>
                <div className="card" style={{ width: '1000px' }}>
                    <PaymentInfo appointmentData={appointmentData} userInfo={userInfo} />
                    <br />
                    <p>
                        Сума за наплата: <b>{amount} денари</b>
                    </p>
                    <br />
                    <button type="button" id="payment-button" onClick={handlePayment}>
                        Извршете наплата
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Payment;
