// In CategorySelection.js
import React, { useState, useEffect } from 'react';
import BubbleContainer from '../Bubbles/BubbleContainer';

function CategorySelection({ onSelectCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3000/appointments/categories');
            const data = await response.json();

            const transformedCategories = data.map((category) => ({
                id: category,
                label: category,
            }));

            console.log(transformedCategories);
            setCategories(transformedCategories);

        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSelectCategory = (categoryLabel) => {
        onSelectCategory(categoryLabel);
    };

    return <BubbleContainer options={categories} onSelect={handleSelectCategory} />;
}

export default CategorySelection;
