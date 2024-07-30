import React, { useEffect, useState } from 'react';
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

import TypeSelection from '../Appointment/Selections/TypeSelection';
import CategorySelection from '../Appointment/Selections/CategorySelection';
import TimeSelection from '../Appointment/Selections/TimeSelection';
import LocationSelection from "./Selections/LocationSelection";

function Appointment() {
    const [selectedAppointment, setSelectedAppointment] = useState({
        date: null,
        type: null,
        category: null,
        time: null,
        location: null,
        appointmentId: null
    });
    const [allAppointments, setAllAppointments] = useState([]);
    const [availableAppointments, setAvailableAppointments] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        console.log("Selected Appointment:", selectedAppointment);
    }, [selectedAppointment]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await axios.get('http://localhost:8080/appointments', config);
                setAllAppointments(response.data);
                console.log("All appointments:", response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
    }, []);

    useEffect(() => {
        const filteredAppointments = filterAppointments(allAppointments);
        console.log("Filtered appointments", filteredAppointments);
        const availableTimeSlotAppointments = filteredAppointments.map(appointment =>
            createAppointmentTimeSlotObject(appointment)
        );
        setAvailableAppointments(availableTimeSlotAppointments);
        console.log("Available appointments", availableTimeSlotAppointments);
    }, [selectedAppointment, allAppointments]);

    const filterAppointments = (allAppointments) => {
        return allAppointments.filter(appointment => {
            const matchesDate = !selectedAppointment.date || appointment.dateTime.substring(0, 10) === selectedAppointment.date;
            const matchesType = !selectedAppointment.type || appointment.location.appointmentType === selectedAppointment.type;
            const matchesLocation = !selectedAppointment.location || appointment.location.name === selectedAppointment.location;
            const matchesCategory = !selectedAppointment.category || appointment.category === selectedAppointment.category;

            return matchesDate && matchesType && matchesLocation && matchesCategory && !appointment.isBooked;
        });
    };

    function createAppointmentTimeSlotObject(appointment) {
        const dateTimeString = appointment.dateTime;
        const formattedTime = dateTimeString.substring(11, 16);
        return {
            appointmentId: appointment.uuid,
            id: formattedTime,
            label: formattedTime
        };
    }

    const formatDate = (newDate) => {
        const inputDate = new Date(newDate);
        const year = inputDate.getFullYear();
        const month = inputDate.getMonth() + 1;
        const day = inputDate.getDate();
        return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    };

    const handleDateChange = (newDate) => {
        const formattedDate = formatDate(newDate);
        setSelectedAppointment({
            date: formattedDate,
            type: null,
            category: null,
            time: null,
            location: null,
            appointmentId: null
        });
    };

    const handleSelectType = (newType) => {
        setSelectedAppointment(prevState => ({
            ...prevState,
            type: newType
        }));
    };

    const handleSelectCategory = (newCategory) => {
        setSelectedAppointment(prevState => ({
            ...prevState,
            category: newCategory
        }));
    };

    const handleLocationChange = (newLocation) => {
        setSelectedAppointment(prevState => ({
            ...prevState,
            location: newLocation
        }));
    };

    const handleSelectTime = (newTime) => {
        setSelectedAppointment(prevState => ({
            ...prevState,
            time: newTime
        }));
    };

    const handleSubmit = () => {
        availableAppointments.forEach(appointment => {
            if (appointment.id === selectedAppointment.time) {
                selectedAppointment.appointmentId = appointment.appointmentId;
            }
        });

        const queryString = new URLSearchParams(selectedAppointment).toString();
        history(`/payment?${queryString}`);
    }

    const isInfoComplete = () => {
        return selectedAppointment.date && selectedAppointment.type
            && selectedAppointment.category && selectedAppointment.location;
    };

    return (
        <div className="div-container text">
            <h1>Закажи термин за полагање</h1>
            <section>
                <p>Избери датум и пополни ги полињата за полагањето што сакаш да го закажеш</p>
                <div className="column left-column calendar-container">
                    <Calendar
                        value={selectedAppointment.date ? new Date(selectedAppointment.date) : null}
                        onClickDay={handleDateChange}
                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px' }}
                    />
                </div>
                <div className="column right-column">
                    <div className="bubble-container ">
                        <p><b>Тип на полагање: </b></p>
                        <TypeSelection onSelectType={handleSelectType} /><br />
                    </div>
                    <div className="bubble-container ">
                        <p><b>Локација: </b></p>
                        <LocationSelection onSelectLocation={handleLocationChange} /><br />
                    </div>
                    <div className="bubble-container">
                        <p><b>Категорија на полагање: </b></p>
                        <CategorySelection onSelectCategory={handleSelectCategory} /><br />
                    </div>
                    <div className="bubble-container">
                        <p><b>Време на полагање: </b></p>
                        {isInfoComplete() && (
                            <TimeSelection
                                availableAppointments={availableAppointments}
                                onSelectTime={handleSelectTime} />
                        )}
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
