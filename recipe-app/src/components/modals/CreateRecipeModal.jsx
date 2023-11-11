import React, { useState } from 'react';
import Modal from '../common/Modal';
import FormInput from '../common/FormInput';
import FormTextArea from '../common/FormTextArea';
import FormFileInput from '../common/FormFileInput';
import Button from '../common/Button';
import './CreateRecipeModal.scss';

const CreateRecipeModal = ({ isOpen, onClose, onCreate }) => {
    const [recipeData, setRecipeData] = useState({
        recipeName: '',
        recipeImagePath: '',
        ingredientDescription: '',
        stepInstruction: '',
        cookingTime: '',
        // Add more
    });

    const handleChange = (e) => {
        setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setRecipeData({ ...recipeData, [e.target.name]: e.target.files[0] });
    }

    const handleCreate = async (e) => {
        e.preventDefault();
            // 简单的数据验证
        if (!recipeData.recipeName.trim()) {
            alert('Please enter a recipe name.');
            return;
        }
        if (!recipeData.ingredientDescription.trim()) {
            alert('Please enter ingredient description.');
            return;
        }
        if (!recipeData.stepInstruction.trim()) {
            alert('Please enter step instruction.');
            return;
        }
        if (!recipeData.cookingTime || isNaN(recipeData.cookingTime) || recipeData.cookingTime <= 0) {
            alert('Please enter a valid cooking time (in minutes).');
            return;
        }
        onCreate(recipeData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form className="create-recipe-form" onSubmit={handleCreate}>
                <FormInput 
                    name="recipeName"
                    label="Recipe Name"
                    value={recipeData.recipeName}
                    onChange={handleChange}
                />
                <FormFileInput
                    name="recipeImagePath"
                    label="Recipe Image"
                    onChange={handleFileChange}
                />
                <FormTextArea
                    name="ingredientDescription"
                    label="Ingredients"
                    value={recipeData.ingredientDescription}
                    onChange={handleChange}
                />
                <FormTextArea
                    name="stepInstruction"
                    label="Steps"
                    value={recipeData.stepInstruction}
                    onChange={handleChange}
                />
                <FormInput 
                    name="cookingTime"
                    label="Cooking Time"
                    value={recipeData.cookingTime}
                    onChange={handleChange}
                />
                {/* Add more */}
                <Button type = "submit">Create</Button>
            </form>
        </Modal>
    );

};

export default CreateRecipeModal;