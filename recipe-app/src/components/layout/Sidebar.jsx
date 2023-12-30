import React from 'react';
import './Sidebar.scss';

const Sidebar = ({ setActiveTab, category}) => {
    const renderMenuItems = () => {
        if (category === 'admin') {
            return (
                <>
                    <li onClick={() => setActiveTab('dashboard')}>Dashboard</li>
                    <li onClick={() => setActiveTab('recipes')}>Recipes</li>
                    <li onClick={() => setActiveTab('users')}>Users</li>
                    <li onClick={() => setActiveTab('ingredients')}>Ingredients</li>
                    <li onClick={() => setActiveTab('reviews')}>Reviews</li>
                </>
            );
        } else {
            return (
                <>
                    <li onClick={() => setActiveTab('details')}>Details</li>
                    <li onClick={() => setActiveTab('recipes')}>My Recipes</li>
                    <li onClick={() => setActiveTab('reviews')}>My Reviews</li>
                    <li onClick={() => setActiveTab('favorites')}>Favorites</li>
                </>
            );
        }
    };

    return (
        <div className="sidebar">
            <ul>
                {renderMenuItems()}
            </ul>
        </div>
    );
};

export default Sidebar;
