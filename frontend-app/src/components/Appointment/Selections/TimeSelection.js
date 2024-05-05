// In TimeSelection.js
import React from 'react';
import BubbleContainer from '../Bubbles/BubbleContainer';

function TimeSelection({ availableAppointments, onSelectTime }) {
  const handleSelectTime = (timeId) => {
    onSelectTime(timeId);
  };

  return <BubbleContainer options={availableAppointments} onSelect={handleSelectTime} />;
}

export default TimeSelection;
