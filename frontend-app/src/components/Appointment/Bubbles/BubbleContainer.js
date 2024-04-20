import React from 'react';

function Bubble({ id, label, onClick, isSelected }) {
    const handleClick = () => {
        onClick(id);
    };
    return (
        <div
            className={`bubble ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
            style={{ margin: '5px' }}
            id={id}
        >
            {label}
        </div>
    );
}

function BubbleContainer({ options, onSelect }) {
    return (
        <div className="bubble-container">
            {options.map((option, index) => (
                <Bubble
                    id={option.id}
                    label={option.label}
                    onClick={() => onSelect(option)}
                    isSelected={option.isSelected}
                    key={index}
                />
            ))}
        </div>
    );
}

export default BubbleContainer;
