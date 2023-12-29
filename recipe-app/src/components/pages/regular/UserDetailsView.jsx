import React from 'react';
import DetailContent from '../../common/DetailContent';
import Button from '../../common/Button';


function UserDetailsView( { onEdit, user }) {
    const userConfig = {
        title: 'name', 
        image: 'profileImage', 
        ignoreFields: ['id', 'password', 'createdAt', 'updatedAt', 'name'] // 忽略的字段
    };
    
    return (
        <div className="user-details-view">
            <h1>User Details</h1>
            <h2>{user.name}</h2>
            {/* Display other user details here */}
            <DetailContent data={user} config={userConfig} />
            <Button onClick={onEdit} className="edit-button">
                Edit
            </Button>
        </div>
    );
}

export default UserDetailsView;