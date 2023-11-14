import React from 'react';
import DetailsModal from './DetailsModal.jsx';

const RecipeDetailsModal = ({ isOpen, onClose, recipe }) => {
    return (
        <DetailsModal 
            isOpen = {isOpen}
            onClose = {onClose}
            data = {recipe.data}
            type = 'recipe'
            className="recipe-details-modal"
        />
    );
};

export default RecipeDetailsModal;

// Path: recipe-app/src/components/common/Modal.jsx