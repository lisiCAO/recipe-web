import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Recipes from '../components/pages/Recipes'; 
import Users from '../components/pages/Users'; 
import Ingredients from '../components/pages/Ingredients';
import Reviews from '../components/pages/Reviews';
import './AdminPanel.scss';
import DashBoard from "../components/pages/DashBoard";

// Create your AdminPanel component
const AdminPanel = () => {
    // Add state to keep track of which tab is active
    const [activeTab, setActiveTab] = useState('dashboard'); // Default to 'recipes' tab

    // Add a function to render the content of the tab
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashBoard onCardClick={setActiveTab}/>;
            case 'recipes':
                return <Recipes />;
            case 'users':
                return <Users />;
            case 'ingredients':
                return <Ingredients />;
            case 'reviews':
                return <Reviews />;
            // Add cases for other tabs as they become functional
            default:
                return <div>Select a tab</div>;
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-body">
                <Sidebar setActiveTab={setActiveTab} />
                <div className="admin-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
