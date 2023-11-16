import React from 'react';
import './Sidebar.scss';

const Sidebar = ({ setActiveTab }) => {
    return (
        <div className="sidebar">
            <ul>
                <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
                <li onClick={() => setActiveTab('recipes')}>Recipes</li>
                <li onClick={() => setActiveTab('users')}>Users</li>
                <li onClick={() => setActiveTab('ingredients')}>Ingredients</li>
                <li onClick={() => setActiveTab('reviews')}>Reviews</li>
            </ul>
        </div>
    );
};

export default Sidebar;
