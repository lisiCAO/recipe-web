import React, { useState } from 'react';
import Modal from './Modal';
import FormInput from '../common/FormInput';
import Button from '../common/Button';

const LoginModal = ({ onLogin, onClose, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    return (
        <div className="login-modal">
        <Modal isOpen={true} onClose={onClose}>
            <div className="login-content">
                <div className="error">{error}</div>
                <h2>Login</h2>
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
                <Button onClick={() => onLogin(email, password)}>Sign In</Button>
            </div>
        </Modal>
        </div>
    );
};

export default LoginModal;
