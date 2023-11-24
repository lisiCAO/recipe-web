import React from 'react';
import FormModal from '../FormModal.jsx';
import ingredientConfig from './ingredientConfig.js';

const EditIngredientModal = ({ isOpen, onClose, onEdit, ingredientData }) => {
    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onEdit}
            config={ingredientConfig}
            initialData={ingredientData}
            mode="edit"
        />
    );
};

export default EditIngredientModal;


// Path: recipe-app/src/components/modals/ingredients/EditIngredientModal.jsx
