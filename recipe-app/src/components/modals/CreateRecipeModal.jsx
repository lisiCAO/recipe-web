import React from 'react';
import CreateModal from '../common/CreateModal';
import './CreateRecipeModal.scss';

const recipeConfig = [
    {
        name: 'recipeName',
        label: 'Recipe Name',
        type: 'text'
    },
    {
        name: 'recipeImagePath',
        label: 'Recipe Image',
        type: 'file'
    },
    {
        name: 'ingredientDescription',
        label: 'Ingredients',
        type: 'textarea'
    },
    {
        name: 'stepInstruction',
        label: 'Steps',
        type: 'textarea'
    },
    {
        name: 'cookingTime',
        label: 'Cooking Time',
        type: 'text'
    },
    // 可以继续添加其他字段...
];



const CreateRecipeModal = ({ isOpen, onClose, onCreate }) => {
    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onCreate={onCreate}
            config={recipeConfig}
        />
    );
};

export default CreateRecipeModal;

// Path: recipe-app/src/components/modals/EditRecipeModal.jsx