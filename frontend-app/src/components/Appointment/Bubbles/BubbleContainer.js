import React, {useEffect, useState} from 'react';

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

function BubbleContainer({ options, onSelect, isCleared }) {
    const [selectedBubbleId, setSelectedBubbleId] = useState(null);

    useEffect(() => {
        if (isCleared) {
            setSelectedBubbleId(null);
        }
    }, [isCleared]);

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
