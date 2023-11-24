import React from 'react';
import FormModal from '../FormModal.jsx';
import reviewConfig from './reviewConfig.js';
import './CreateReviewModal.scss';


const CreateReviewModal = ({ isOpen, onClose, onCreate }) => {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onCreate}
            config={reviewConfig}
            mode="create"
        />
    );
};


export default CreateReviewModal;


// Path: recipe-app/src/components/modals/CreateReviewModal.jsx