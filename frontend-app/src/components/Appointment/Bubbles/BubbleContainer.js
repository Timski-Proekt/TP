import React, { useState } from 'react';

function Bubble({ id, label, onClick, isSelected }) {
    return (
        <div
            className={`bubble ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
            style={{ margin: '5px' }}
            id={id}
        >
            {label}
        </div>
    );
}

function BubbleContainer({ options, onSelect }) {
    const [selectedBubbleId, setSelectedBubbleId] = useState(null);

    const handleBubbleClick = (id) => {
        setSelectedBubbleId(id);
        onSelect(id);
    };

    return (
        <div className="bubble-container">
            {options.map((option, index) => (
                <Bubble
                    key={index}
                    id={option.id}
                    label={option.label}
                    onClick={() => handleBubbleClick(option.id)}
                    isSelected={selectedBubbleId === option.id }
                />
            ))}
        </div>
    );
}

export default BubbleContainer;
