import React, { useEffect, useState } from 'react';
import RecipeCard from './../../common/RecipeCard';
import ApiService from '../../../services/ApiService';
import RecipeDetailsModal from '../../modals/recipes/RecipeDetailsModal';
import './UserRecipes.scss';

const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
      ApiService.getUserRecipes()
      .then(response => {
          if (Array.isArray(response)) {
              setRecipes(response);
          }
          else {
              console.error('Unable to fetch recipes.');
              return [];
          }
        })
        .catch(error => {
          console.error(error);
          // showMessage('error', 'Unable to fetch recipes.');
          setRecipes([]);
      });
    }, []);

    const handleOpenDetails = (recipe) => {
      setSelectedRecipe(recipe);
      setIsDetailsOpen(true);
  };

    const handleCloseDetails = () => {
      setIsDetailsOpen(false);
      setSelectedRecipe(null);
  };

    return (
        <div>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} onOpenDetails={handleOpenDetails} />
            ))}
            <RecipeDetailsModal
                isOpen={isDetailsOpen}
                onClose={handleCloseDetails}
                recipe={selectedRecipe}
            />
        </div>
    );
};

export default UserRecipes;
