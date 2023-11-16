import React, { useState } from 'react';
import Navbar from './../components/common/Navbar'; // Import your Navbar component
import Sidebar from '../components/admin/Sidebar';// Create and import your Sidebar component
import Recipes from '../components/pages/Recipes'; // Import your Recipes component
import './AdminPanel.scss'; // Import your SCSS for styling

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('recipes'); // Default to 'recipes' tab

    const renderContent = () => {
        switch (activeTab) {
            case 'recipes':
                return <Recipes />;
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
