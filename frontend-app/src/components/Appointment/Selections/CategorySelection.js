// In CategorySelection.js
import React from 'react';
import BubbleContainer from '../Bubbles/BubbleContainer';

function CategorySelection({ onSelectCategory }) {
    const categories = ["A","B","C","D"];

    const handleSelectCategory = (categoryId) => {
        onSelectCategory(categoryId);
    };

    return <BubbleContainer options={categories} onSelect={handleSelectCategory} />;
}

export default CategorySelection;
