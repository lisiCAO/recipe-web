import React from 'react';
import DetailContent from '../../../common/DetailContent';
import Button from '../../../common/Button';
import './UserDetailsView.scss';


function UserDetailsView( { onEdit, user }) {
    const userConfig = {
        title: 'name', 
        image: 'profileImage', 
        ignoreFields: ['id', 'password', 'createdAt', 'updatedAt'] // 忽略的字段
    };
    
    return (
        <div className="user-details-view">
            <h1>User Details</h1>
            {/* Display other user details here */}
            <DetailContent data={user} config={userConfig} />
            <Button onClick={onEdit} className="edit-button">
                Edit
            </Button>
        </div>
    );
}

export default UserDetailsView;