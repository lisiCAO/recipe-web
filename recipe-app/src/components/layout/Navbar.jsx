import React from 'react';

import Button from '../common/Button';
import './Navbar.scss'; 

const Navbar = ({ onLoginClick, isLoggedIn, user, onLogout, navigateTo }) => {
    const handleUserClick = () => {
        navigateTo(user?.category === 'admin' ? 'adminPanel' : 'userProfile');
    };
    return (
        <nav className="navbar">
            <div className="logo" >
                <img src="logo.png" alt="logo" />
            </div>
            <div className="title">Recipe Web</div>
            {!isLoggedIn ?
                <Button onClick={onLoginClick}>Login</Button> :
                <>
                    <div className="user-info" onClick={handleUserClick}>
                    Welcome, {user.email}
                    </div>
                    <Button onClick={onLogout}>Logout</Button>
                </>
            }
        </nav>
    );
};

export default Navbar;
