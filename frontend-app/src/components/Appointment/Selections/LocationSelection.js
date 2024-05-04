import React, { useState, useEffect } from 'react';

function LocationComponent({ onSelectLocation}) {
    const [locations, setLocations] = useState([]);

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
        const selectedLocation = event.target.value;
        onSelectLocation(selectedLocation);
    };

    return (
        <div style={{ margin: '15px' }}>
            <select onChange={handleLocationChange}>
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