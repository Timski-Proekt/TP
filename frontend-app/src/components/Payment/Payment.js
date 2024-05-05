import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Payment() {
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
        category: ""
    });
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const appointmentData = Object.fromEntries(searchParams.entries());
        setAppointmentData(appointmentData);
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission, such as sending the data to a server
        console.log('Form submitted:', formData);
        // Reset form data after submission if needed
        setFormData({
            name: '',
            cardNumber: '',
            expiryDate: '',
            ccv: ''
        });
    };

    return (
        <div className="div-container text">
            <h1>Форма за плаќање</h1>
            <section>
                <form className="column left-column form card" onSubmit={handleSubmit}>
                    <p>Внесете ги своите информации за наплата</p><br/>
                    <label>
                        Name on Card:<br/>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleChange}
                            required
                            style={{ width: '350px' }}
                        />
                    </label>
                    <br />
                    <label>
                        Card Number:<br/>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber || ""}
                            onChange={handleChange}
                            required
                            style={{ width: '350px' }}
                        />
                    </label>
                    <br />
                    <div style={{ display: 'flex' }}>
                        <label >
                            Expiry Date:<br/>
                            <input
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate || ""}
                                onChange={handleChange}
                                required
                                style={{ width: '150px' }}
                            />
                        </label>
                        <br />
                        <label style={{marginLeft: '35px'}}>
                            CCV:<br/>
                            <input
                                type="text"
                                name="ccv"
                                value={formData.ccv || ""}
                                onChange={handleChange}
                                required
                                style={{ width: '150px' }}
                            />
                        </label>
                    </div>
                    <br/>
                    <p>Сума на наплата: suma den.</p>
                    <br/>
                    <a href="#" id="payment-button">Изврши плаќање</a>
                </form>
                <div id="info" className="column right-column">
                    <h5><b>Информации за полагањето:</b></h5>
                    <div className="info-columns">
                        <div className="payment-info-column">
                            <div className="payment-info-container">
                                <p><b>Име и презиме: </b></p>
                                <p>Ime i prezime</p>
                            </div>
                            <div className="payment-info-container">
                                <p><b>Емаил: </b></p>
                                <p>Email</p>
                            </div>
                            <div className="payment-info-container">
                                <p><b>Код на полагање: </b></p>
                                <p>{appointmentData.appointmentId}</p>
                            </div>
                        </div>
                        <div className="payment-info-column">
                            <div className="payment-info-container">
                                <p><b>Тип на полагање: </b></p>
                                <p>{appointmentData.type}</p>
                            </div>
                            <div className="payment-info-container">
                                <p><b>Категорија: </b></p>
                                <p>{appointmentData.category}</p>
                            </div>
                            <div className="payment-info-container">
                                <p><b>Време: </b></p>
                                <p>{appointmentData.time}</p>
                            </div>
                        </div>
                        <div className="payment-info-column">
                            <div className="payment-info-container">
                                <p><b>Локација: </b></p>
                                <p>{appointmentData.location}</p>
                            </div>
                            <div className="payment-info-container">
                                <p><b>Датум: </b></p>
                                <p>{appointmentData.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Payment;
