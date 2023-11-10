import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="admin-sidebar">
            <nav className="admin-nav">
                <Link to="/admin/dashboard" className="admin-nav-item">Dashboard</Link>
                <Link to="/admin/recipes" className="admin-nav-item">Recipes</Link>
                <Link to="/admin/users" className="admin-nav-item">Users</Link>
                <Link to="/admin/reviews" className="admin-nav-item">Reviews</Link>
                <Link to="/admin/ingredients" className="admin-nav-item">Ingredients</Link>
                {/* Add more links here */}
            </nav>
        </aside>
    );
};

export default Sidebar;