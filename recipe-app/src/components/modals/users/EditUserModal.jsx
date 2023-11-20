import React from 'react';
import FormModal from '../FormModal.jsx';
import userConfig from './userConfig.js';

const EditUserModal = ({ isOpen, onClose, onEdit, userData }) => {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onEdit}
            config={userConfig}
            initialData={userData}
            mode="edit"
        />
    );
};

export default EditUserModal;

// Path: recipe-app/src/components/modals/users/EditUserModal.jsx
