import React from 'react';
import DetailsModal from '../DetailsModal.jsx';

const IngredientDetailsModal = ({ isOpen, onClose, ingredient, onEdit }) => {
    return (
        <DetailsModal 
            isOpen = {isOpen}
            onClose = {onClose}
            data = {ingredient.data}
            type = 'ingredient'
            className="ingredient-details-modal"
            onEdit={onEdit}
        />
    );
};

export default IngredientDetailsModal;

// Path: recipe-app/src/components/modals/ingredients/IngredientDetailsModal.jsx