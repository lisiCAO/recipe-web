import React from 'react';

import Button from './Button';
import './Navbar.scss'; // Your custom styling for the navbar

const Navbar = ({ onLoginClick, isLoggedIn, userEmail, onLogout }) => {
    return (
        <nav className="navbar">
            <div className="logo">Logo</div>
            <div className="title">Recipe Admin Panel</div>
            {!isLoggedIn ?
                <Button onClick={onLoginClick}>Login</Button> :
                <>
                    <div>Welcome, {userEmail}</div>
                    <Button onClick={onLogout}>Logout</Button>
                </>
            }
        </nav>
    );
};

export default Navbar;
