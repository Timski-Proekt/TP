// In TimeSelection.js
import React from 'react';
import BubbleContainer from '../Bubbles/BubbleContainer';

function TimeSelection({ onSelectTime }) {
  const times = [1,2,3];

  const handleSelectTime = (timeId) => {
    onSelectTime(timeId);
  };

  return <BubbleContainer options={times} onSelect={handleSelectTime} />;
}

export default TimeSelection;
