import React, { useState, useContext } from 'react';
import Modal from './Modal';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import { MessageContext } from '../common/MessageContext';
import Message from '../common/Message';

const LoginModal = ({ onLogin, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { message } =useContext(MessageContext);
    
    return (
        <div className="login-modal">
        <Modal isOpen={true} onClose={onClose}>
            <div className="login-content">
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
                <Message message = {message} />
                <Button onClick={() => onLogin(email, password)}>Sign In</Button>
            </div>
        </Modal>
        </div>
    );
};

export default LoginModal;
