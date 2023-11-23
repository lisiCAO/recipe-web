import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Recipes from '../components/pages/Recipes'; 
import Users from '../components/pages/Users'; 
import './AdminPanel.scss'; 

// Create your AdminPanel component
const AdminPanel = () => {
    // Add state to keep track of which tab is active
    const [activeTab, setActiveTab] = useState('recipes'); // Default to 'recipes' tab

    // Add a function to render the content of the tab
    const renderContent = () => {
        switch (activeTab) {
            case 'recipes':
                return <Recipes />;
            case 'users':
                return <Users />;
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
