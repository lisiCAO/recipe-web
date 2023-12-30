import React, { useState, useContext } from 'react'; 
import { UserContext } from '../../../components/common/UserContext';
import UserDetailsView from './profile/UserDetailsView';
import UserDetailsEdit from './profile/UserDetailsEdit';
import ApiService from '../../../services/ApiService';
import { MessageContext } from '../../common/MessageContext';
import './UserDetails.scss'

const UserDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { showMessage } = useContext(MessageContext);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    }

    const handleEditSubmit = async (updatedUser) => {
        const response = await ApiService.updateUser(user.id, updatedUser);
        setUser(response);
        showMessage('success', 'User updated successfully');
        setIsEditing(false); 
    };

    return (
        <div className="user-details">
            {isEditing ? (
                <UserDetailsEdit setIsEditing={handleEditClick} user={user} onSubmit={handleEditSubmit}/>
            ) : (
                <UserDetailsView onEdit={handleEditClick} user={user}/>
            )}
        </div>
    );
};

export default UserDetails;
