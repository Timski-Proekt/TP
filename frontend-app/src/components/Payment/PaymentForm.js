import React from 'react';

const PaymentForm = ({ formData, amount, onChange, onSubmit }) => {
    return (
        <form className="column left-column form card" onSubmit={onSubmit}>
            <p>Внесете ги своите информации за наплата</p><br/>
            <label>
                Name on Card:<br/>
                <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={onChange}
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
                    onChange={onChange}
                    required
                    style={{ width: '350px' }}
                />
            </label>
            <br />
            <div style={{ display: 'flex' }}>
                <label>
                    Expiry Date:<br/>
                    <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate || ""}
                        onChange={onChange}
                        required
                        style={{ width: '150px' }}
                    />
                </label>
                <br />
                <label style={{ marginLeft: '35px' }}>
                    CCV:<br/>
                    <input
                        type="text"
                        name="ccv"
                        value={formData.ccv || ""}
                        onChange={onChange}
                        required
                        style={{ width: '150px' }}
                    />
                </label>
            </div>
            <br/>
            <p>Сума на наплата: <b>{amount} денари</b></p>
            <br/>
            <a href="#" id="payment-button">Изврши плаќање</a>
        </form>
    );
};

export default PaymentForm;
