import React, { useState, useContext } from 'react';
import UserDetailsView from './UserDetailsView';
import UserDetailsEdit from './UserDetailsView';
import { UserContext } from '../../../components/common/UserContext';
import ApiService from '../../../services/ApiService';
import { MessageContext } from '../../common/MessageContext';


const UserDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { showMessage} = useContext(MessageContext);

    const handleEditSubmit = async (updatedUser) => {
        console.log('Updating user:', updatedUser);
        const { category, ...updatableFields } = updatedUser;
        try {
            const response = await ApiService.updateUser(user.id, updatableFields);
            console.log('updatedUser', response);
            setUser({ ...response, category: user.category });
            showMessage('success', 'User updated successfully');
            setIsEditing(false); 
        } catch (error) {
            console.error('Error updating user:', error);
            showMessage('error', 'Failed to update user');
        }
    };
    return (
        <div className="user-details">
            {isEditing ? (
                <UserDetailsEdit setIsEditing={setIsEditing} user={user} onSubmit={handleEditSubmit}/>
            ) : (
                <UserDetailsView setIsEditing={setIsEditing} user={user}/>
            )}
        </div>
    );
};

export default UserDetails;
