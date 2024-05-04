import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

import TypeSelection from '../Appointment/Selections/TypeSelection';
import CategorySelection from '../Appointment/Selections/CategorySelection';
import TimeSelection from '../Appointment/Selections/TimeSelection';
import LocationSelection from "./Selections/LocationSelection";

function Appointment(){

    const [selectedDate, setDate] = useState(new Date());
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const history = useNavigate();

    useEffect(() => {
        console.log(selectedDate)
        console.log(selectedType);
        console.log(selectedCategory);
        console.log(selectedLocation);
    }, [selectedDate, selectedType, selectedCategory, selectedLocation]);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleSelectType = (type) => {
        setSelectedType(type);
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        console.log(category);
    };

    const handleSelectTime = (time) => {
        setSelectedTime(time);
    };

    const handleLocationChange = (location) => {
        setSelectedLocation(location);
    };

    const handleSubmit = () => {
        const appointmentData = {
            date: selectedDate,
            type: selectedType,
            location: selectedLocation,
            time: selectedTime,
            category: selectedCategory
        };

        const queryString = new URLSearchParams(appointmentData).toString();
        history(`/payment?${queryString}`);
    }

    return(
        <div className="div-container text">
            <h1>Закажи термин за полагање</h1>
            <section>
                <p>Избери датум и пополни ги полињата за полагањето што сакаш да го закажеш</p>
                <div className="column left-column calendar-container">
                    <Calendar
                        value={selectedDate}
                        onClickDay={handleDateChange}
                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}
                    />
                </div>
                <div className="column right-column">
                    <div className="bubble-container ">
                        <p><b>Тип на полагање: </b></p>
                        <TypeSelection onSelectType={handleSelectType}/><br/>
                    </div>
                    <div className="bubble-container ">
                        <p><b>Локација: </b></p>
                        <LocationSelection onSelectLocation={handleLocationChange} /><br/>
                    </div>
                    <div className="bubble-container">
                        <p><b>Категорија на полагање: </b></p>
                        <CategorySelection onSelectCategory={handleSelectCategory} /><br/>
                    </div>
                    <div className="bubble-container">
                        <p><b>Време на полагање: </b></p>
                        <TimeSelection onSelectTime={handleSelectTime} />
                    </div>
                    <div>
                        <a onClick={handleSubmit} className="button">Избери термин</a>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Appointment;