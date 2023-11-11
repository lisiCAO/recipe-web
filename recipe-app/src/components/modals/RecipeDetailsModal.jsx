import React from 'react';
import DetailsModal from './DetailsModal';
import './RecipeDetailsModal.scss';

const RecipeDetailsModal = ({ isOpen, onClose, recipe }) => {
    return (
        <DetailsModal 
            isOpen = {isOpen}
            onClose = {onClose}
            data = {recipe}
            type = 'recipe'
            className="recipe-details-modal"
        />
    );
};

export default RecipeDetailsModal;

// Path: recipe-app/src/components/common/Modal.jsx