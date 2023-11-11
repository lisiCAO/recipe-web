import React from 'react';
import DetailsModal from './DetailsModal';
import './RecipeDetailsModal.scss';

const RecipeDetailsModal = ({ recipe, onClose, recipe }) => {
    return (
        <DetailsModal 
            isOpen = {isOpen}
            onClose = {onClose}
            data = {recipe}
            type = 'recipe'
        />
    );
};

export default RecipeDetailsModal;