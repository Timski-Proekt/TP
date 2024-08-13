import React, { useEffect, useState } from 'react';
import Modal from "../Modal/Modal";
import True from "../../img/trueImg.png"
import False from "../../img/falseImg.png"
import { fetchUserInfo, fetchAppointmentsByUser } from '../Services/AxiosServices.js'
import useLogout from "../Authentication/logout";

const Profile = () => {
    const [user, setUser] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [modalAppear, setModalAppear] = useState(true);
    const [loading, setLoading] = useState(true);
    const logout = useLogout();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserInfo();
                setUser(userData);

                const appointmentsData = await fetchAppointmentsByUser();
                setAppointments(appointmentsData);

                setModalAppear(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <Modal show={modalAppear} />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-welcome">
                        <h1>Добредојде, {user.name} {user.lastName}</h1>
                    </div>
                    <div className="logout-button">
                        {localStorage.getItem('token') ? <button className="btn btn-outline-secondary" onClick={logout}>Одјави се</button> :<div></div>}
                    </div>
                </div>
                <div className="profile-info">
                    <p><strong>Email:</strong> {user.email || 'Loading...'}</p>
                    <p><strong>Телефонски број:</strong> {user.phone || 'Loading...'}</p>
                    <p><strong>Автошкола:</strong> {user.drivingSchoolName || 'Loading...'}</p>
                </div>
                <div className="profile-appointments">
                    <h4><strong>Полагања</strong></h4>
                    {appointments && appointments.length > 0 ? (
                        <table>
                            <thead>
                            <tr>
                                <th>Тип</th>
                                <th>Категорија</th>
                                <th>Датум</th>
                                <th>Време</th>
                                <th>Локација</th>
                                <th>Цена</th>
                                <th>Негативни поени</th>
                                <th>Положено</th>
                            </tr>
                            </thead>
                            <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.location.appointmentType || 'N/A'}</td>
                                    <td>{appointment.category || 'N/A'}</td>
                                    <td>{appointment.dateTime.substring(0,10)}</td>
                                    <td>{appointment.dateTime.substring(11,16) || 'N/A'}</td>
                                    <td>{appointment.location.name || 'N/A'}</td>
                                    <td>{appointment.price}</td>
                                    <td>{appointment.negativePoints==null ? "/" : appointment.negativePoints}</td>
                                    <td>
                                        {appointment.negativePoints!=null && appointment.negativePoints < 50 ? (
                                            <img src={True} alt="true" className=""/> ) : (
                                            <img src={False} alt="false" />
                                        )
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
