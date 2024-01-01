import React from 'react';
import RecipeCard from '../../../common/RecipeCard'; 
import PropTypes from 'prop-types';
import './RecipeList.scss';

const RecipeList = ({ recipes = [], onRecipeSelect, onDelete, onToggleFavorite} ) => {
    RecipeList.propTypes = {
        recipes: PropTypes.array,
        onRecipeSelect: PropTypes.func,
        onDelete: PropTypes.func,
        onToggleFavorite: PropTypes.func,
    };
    return (
        <div className="user-recipe-list">
            {recipes.map(recipe => (
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onOpenDetails={() => onRecipeSelect(recipe)} // 使用回调
                    onDelete={onDelete}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default RecipeList;

// Path: recipe-app/src/components/pages/regular/recipes/RecipeList.jsx