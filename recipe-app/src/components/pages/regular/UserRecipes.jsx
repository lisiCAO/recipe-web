import React, { useState } from 'react';
import RecipeList from '../../layout/RecipeList';
import RecipeDetails from '../../layout/RecipeDetails';
import RecipeEdit from '../../layout/RecipeEdit';
import ApiService from '../../../services/ApiService';

import './UserRecipes.scss';

const UserRecipes = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchUserRecipes = async () => {
            // 获取数据的逻辑
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

    const handleRecipeSelect = (recipe) => {
        setSelectedRecipe(recipe);
        setCurrentView('details');
    };

    const handleEdit = (recipe) => {
        setSelectedRecipe(recipe);
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