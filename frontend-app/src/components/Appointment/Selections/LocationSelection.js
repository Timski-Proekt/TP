import React, { useState, useEffect } from 'react';

function LocationComponent({ onSelectLocation, isCleared }) {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');

    useEffect(() => {
        fetchLocations();
    }, []);

    useEffect(() => {
        if (isCleared) {
            setSelectedLocation('');
            onSelectLocation('');
        }
    }, [isCleared]);

    const fetchLocations = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await fetch('http://localhost:8080/locations', config);
            const data = await response.json();
            setLocations(data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleLocationChange = (event) => {
        const selectedLocation = event.target.value;
        onSelectLocation(selectedLocation);
        setSelectedLocation(selectedLocation);
    };

    return (
        <div style={{ margin: '15px' }}>
            <select value={selectedLocation} onChange={handleLocationChange}>
                <option value="">Избери</option>
                {locations.map((location, index) => (
                    <option key={index} value={location.name}>
                        {location.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default LocationComponent;