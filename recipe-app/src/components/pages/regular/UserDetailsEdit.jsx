import React, {useContext} from 'react';
import CustomForm from './../../common/CustomForm';
import userConfig from '../../modals/users/userConfig';
import { MessageContext } from './../../common/MessageContext';
import Button from '../../common/Button';

const UserDetailsEdit = ({ setIsEditing, user, onSubmit }) => {
    const { message, hideMessage } = useContext(MessageContext);
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
        <>
        <CustomForm
            config={userConfig}
            initialData={user}
            onSubmit={onSubmit}
            mode="edit"
            onSubmissionSuccess={handleFormSubmissionSuccess}
        />
        <Button onClick={() => {setIsEditing(false); hideMessage();}} className="cancel-button">
            Cancel
        </Button>
        </>
    );
};

export default UserDetailsEdit;
