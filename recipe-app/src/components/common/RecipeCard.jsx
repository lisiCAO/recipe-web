import React from 'react';
import './RecipeCard.scss';

const RecipeCard = ({ recipe, onOpenDetails }) => {
    return (
        <div className="recipe-card" onClick={() => onOpenDetails(recipe)}>
            <img src={recipe.imagePath} alt={recipe.name} />
            <div className="recipe-info">
                <h3>{recipe.name}</h3>
                <p>Comments: {recipe.commentCount}</p>
                <p>Favorites: {recipe.favoriteCount}</p>
            </div>
        </div>
    );
};

export default RecipeCard;
