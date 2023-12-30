import React, { useState, useEffect } from 'react';
import RecipeList from './recipes/RecipeList';
import RecipeDetails from './recipes/RecipeDetails';
import RecipeEdit from '../../layout/RecipeEdit';
import ApiService from '../../../services/ApiService';

import './UserRecipes.scss';

const UserRecipes = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            // Fetch user recipes
            try {
                const response = await ApiService.fetchRecipeByUser();
                if (response) {
                    setRecipes(response);
                }
            } catch (error) {
                console.error('Error fetching user recipes:', error);
            }
        };

        fetchUserRecipes();
    }, []);

    const handleRecipeSelect = async (recipeId) => {
        setSelectedRecipeId(recipeId);
        const response = await ApiService.fetchRecipe(recipeId);
        setSelectedRecipe(response);
        setCurrentView('details');
    };

    const handleEdit = (recipeId) => {
        setSelectedRecipeId(recipeId);
        setCurrentView('edit');
    };

    const renderView = () => {
        switch(currentView) {
            case 'list':
                return <RecipeList recipes={recipes} onRecipeSelect={handleRecipeSelect} />;
            case 'details':
                return <RecipeDetails recipe={selectedRecipe} onEdit={handleEdit} />;
            case 'edit':
                return <RecipeEdit recipe={selectedRecipe} />;
            default:
                return <RecipeList onRecipeSelect={handleRecipeSelect} />;
        }
    };

    return (
        <div>
            {renderView()}
        </div>
    );
};

export default UserRecipes;