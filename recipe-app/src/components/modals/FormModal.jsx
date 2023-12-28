import React, { useContext } from 'react';
import Modal from './Modal';
import { MessageContext } from '../common/MessageContext';
import './FormModal.scss';

const FormModal = ({ isOpen, onClose, onSubmit, config, initialData, mode }) => {
    const { message } =useContext(MessageContext);
    const handleFormSubmissionSuccess = () => {
        if(message){
            setTimeout(() => {
                onClose();
                console.log("submit and enable" + isSubmitting)
            }, 3000);
        } else {
            onClose();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CustomForm
                onSubmit={onSubmit}
                config={config}
                initialData={initialData}
                mode={mode}
                onSubmissionSuccess={handleFormSubmissionSuccess}
            />
        </Modal>
    );
};

export default FormModal;
