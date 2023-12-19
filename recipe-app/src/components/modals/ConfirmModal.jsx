import React from 'react';
import Modal from './Modal'; 
import './ConfirmModal.scss'; 

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    return (
        <Modal isOpen={isOpen} onClose={onCancel}>
            <div className="confirm-modal-content">
                <div className="confirm-modal-header">{title}</div>
                <div className="confirm-modal-body">{message}</div>
                <div className="confirm-modal-footer">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;

