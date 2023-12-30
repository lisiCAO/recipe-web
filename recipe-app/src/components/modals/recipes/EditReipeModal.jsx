import React from 'react';
import FormModal from '../FormModal.jsx';
import recipeConfig from './recipeConfig.js';

const EditRecipeModal = ({ isOpen, onClose, onEdit, recipeData }) => {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onEdit}
            config={recipeConfig}
            initialData={recipeData}
            mode="edit"
        />
    );
};

export default EditRecipeModal;
// Path: recipe-app/src/components/modals/EditRecipeModal.jsx
