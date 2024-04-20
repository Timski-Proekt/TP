import React, { useState, useEffect } from 'react';

function LocationComponent() {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await fetch('http://localhost:8080/locations');
            const data = await response.json();
            setLocations(data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    return (
        <div style={{ margin: '15px' }}>
            <select value={selectedLocation} onChange={handleLocationChange}>
                <option value="">Избери</option>
                {locations.map((location, index) => (
                    <option
                        id={location.id}
                        key = {index}
                        className={selectedLocation === location.id ? 'selected' : ''}
                    >
                        {location.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default LocationComponent;