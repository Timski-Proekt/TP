import React from 'react';

const AppointmentInfo = ({ appointmentData }) => {
    return (
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
                        <p><b>Локација: </b></p>
                        <p>{appointmentData.location}</p>
                    </div>
                </div>
                <div className="payment-info-column">
                    <div className="payment-info-container">
                        <p><b>Датум: </b></p>
                        <p>{appointmentData.date}</p>
                    </div>
                    <div className="payment-info-container">
                        <p><b>Време: </b></p>
                        <p>{appointmentData.time}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentInfo;
