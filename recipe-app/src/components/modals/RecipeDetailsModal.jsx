import React from 'react';
import Modal from '../common/Modal';
import './RecipeDetailsModal.scss';

const RecipeDetailsModal = ({ isOpen, onClose, recipe }) => {
    if(!recipe || !isOpen) return null;

    return (
        <Modal isOpen = {isOpen} onClose = {onClose}>
            <h2>{recipe.recipe_name}</h2>
            <div className = "recipe-details">
                <div className = "recipe-image">
                    <img src = {recipe.recipe_image_path} alt = {recipe.recipe_name} />
                </div>
                <div className = "recipe-info">
                    <p><strong>Ingredients:</strong> {recipe.ingredient_description}</p>
                    <p><strong>Instructions:</strong> {recipe.step_instruction}</p>
                    {/* Add more details here */}
                </div>
            </div>
        </Modal>
    );
};

export default RecipeDetailsModal;