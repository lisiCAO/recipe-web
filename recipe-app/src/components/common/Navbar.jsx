import React from 'react';
import Button from './Button';
import './Navbar.scss'; // Your custom styling for the navbar

const Navbar = ({ onLoginClick, isLoggedIn, userEmail }) => {
    return (
        <nav className="navbar">
            <div className="logo">Logo</div>
            <div className="title">Recipe Admin Panel</div>
            {!isLoggedIn ?
                <Button onClick={onLoginClick}>Login</Button> :
                <div>Welcome, {userEmail}</div>
            }
        </nav>
    );
};

export default Navbar;
