import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles (optional)
//import { useHistory } from 'react-router-dom';

import TypeSelection from '../Appointment/Selections/TypeSelection';
import CategorySelection from '../Appointment/Selections/CategorySelection';
import TimeSelection from '../Appointment/Selections/TimeSelection';
import button from "bootstrap/js/src/button";
import LocationSelection from "./Selections/LocationSelection";

function Appointment(){

    const [selectedDate, setDate] = useState(new Date()); // State to store selected date
    const [selectedType, setSelectedType] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    //const history = useHistory();
    //history.push('/appointment-form', { appointmentData });
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleSelectType = (typeId) => {
        setSelectedType(typeId);
    };

    const handleSelectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        // Perform any other actions based on category selection, such as loading times
    };

    const handleSelectTime = (timeId) => {
        setSelectedTime(timeId);
        // Perform any other actions based on time selection
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleSubmit = () => {
        const appointmentData = {
            date: selectedDate,
            type: selectedType,
            location: selectedLocation,
            time: selectedTime,
            category: selectedCategory
        };
    }

    return(
        <div className="div-container text">
            <h1>Закажи термин за полагање</h1>
            <section>
                <p>Избери датум и пополни ги полињата за полагањето што сакаш да го закажеш</p>
                <div className="column left-column">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
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
                        <button className="button">Избери термин</button>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Appointment;