import React from 'react';
import FormModal from '../FormModal.jsx';
import reviewConfig from './reviewConfig.js';

const EditReviewModal = ({ isOpen, onClose, onEdit, reviewData }) => {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onEdit}
            config={reviewConfig}
            initialData={reviewData}
            mode="edit"
        />
    );
};

export default EditReviewModal;

// Path: recipe-app/src/components/modals/EditReviewModal.jsx
