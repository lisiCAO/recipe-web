import React, { useState } from 'react';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import Button from '../common/Button';


const LoginModal = ({ onLogin, onClose, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Modal isOpen={true} onClose={onClose}>
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
                <Button onClick={() => onLogin(email, password)}>Sign In</Button>
            </div>
        </Modal>
    );
};

export default LoginModal;
