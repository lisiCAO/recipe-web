import React from 'react';
import CustomForm from './CustomForm';
import userConfig from '../../configs/userConfig';

const UserDetailsEdit = ({ setIsEditing, user, onSubmit }) => {
    const handleFormSubmissionSuccess = () => {
        if (message){
            setTimeout(() => {
                setIsEditing(false);
            }, 3000);
        } else {
            setIsEditing(false);
        }
    }

    return (
        <CustomForm
            config={userConfig}
            initialData={user}
            onSubmit={onSubmit}
            mode="edit"
            onSubmissionSuccess={handleFormSubmissionSuccess}
        />
    );
};

export default UserDetailsEdit;
