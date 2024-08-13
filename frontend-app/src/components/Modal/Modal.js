import React from 'react';

const Modal = ({ show }) => {
    if (!show) {
        return null;
    }

    const handleRedirectToLogIn = () => {
        window.location.href = 'http://localhost:3000/';
    };

    const handleRedirectToHomePage = () => {
        window.location.href = 'http://localhost:3000/home';
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Не сте најавени</h2>
                <p>Ве молиме најавете се или регистирајте се за да закажете термин.</p>
                <button onClick={handleRedirectToLogIn}>Кон страницата за најава </button>
                <button onClick={handleRedirectToHomePage}>Кон почетна страница</button>
            </div>
        </div>
    );
};

export default Modal;
