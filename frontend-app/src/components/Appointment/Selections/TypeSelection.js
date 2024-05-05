// In TypeSelection.js
import React from 'react';
import BubbleContainer from '../Bubbles/BubbleContainer';

function TypeSelection({ onSelectType }) {
    const types = [
        { id: "TEORIJA", label: "ТЕОРИЈА" },
        { id: "POLIGON", label: "ПОЛИГОН" },
        { id: "PRAKTICHNO", label: "ПРАКТИЧНО" }
    ];

    const handleSelectType = (type) => {
        onSelectType(type);
    };

    return <BubbleContainer options={types} onSelect={handleSelectType} />;
}

export default TypeSelection;
