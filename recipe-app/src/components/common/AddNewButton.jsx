import React from 'react';
import './AddNewButton.scss';

const AddNewButton = ({ onClick }) => {
    return (
        <button className="add-new-btn" onClick={onClick}>
            Add New
        </button>
    );
};

export default AddNewButton;