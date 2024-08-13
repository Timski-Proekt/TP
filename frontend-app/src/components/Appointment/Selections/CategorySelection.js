import React, { useState, useEffect } from 'react';
import BubbleContainer from '../Bubbles/BubbleContainer';

function CategorySelection({ onSelectCategory, isCleared }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const response = await fetch('http://localhost:8080/appointments/categories',config);
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

    return <BubbleContainer options={categories} onSelect={handleSelectCategory} isCleared={isCleared}/>;
}

export default CategorySelection;
