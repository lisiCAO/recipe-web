import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Modal from '../components/common/Modal';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import './Home.scss'; // Your custom styling for the homepage

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginClick = () => {
        setShowModal(true);
    };

    const handleLogin = () => {
        // Perform validation and authentication here
        // If success:
        setIsLoggedIn(true);
        setUserEmail(email);
        setShowModal(false);
        // If error, set error message:
        // setError('Invalid credentials');
    };
    return (
        <div className="home-page">
            <Navbar 
                onLoginClick={handleLoginClick} 
                isLoggedIn={isLoggedIn} 
                userEmail={userEmail} 
            />
            <main className="welcome-section">
                <h1>Welcome</h1>
            </main>
            {showModal && (
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <div className="login-content">
                        <h2>Login</h2>
                        {error && <div className="error-message">{error}</div>}
                        <FormInput 
                            name="email" 
                            label="Email" 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                        />
                        <FormInput 
                            name="password" 
                            label="Password" 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                        />
                        <Button onClick={handleLogin}>Sign In</Button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Home;
