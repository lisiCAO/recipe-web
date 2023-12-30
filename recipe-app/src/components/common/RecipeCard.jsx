import React from 'react';
import Button from './Button';
import './RecipeCard.scss';

const RecipeCard = ({ recipe, onOpenDetails, onDelete }) => {
    const handleButtonClick = (event) => {
        event.stopPropagation(); // 阻止事件冒泡
        if (onDelete) {
            onDelete(recipe);
        }
    };
    return (
        <div className="recipe-card" onClick={() => onOpenDetails(recipe)}>
            <img src={`http://localhost:8000${recipe.imagePath}`} alt={recipe.name} />
            <div className="recipe-info">
                <h3>{recipe.name}</h3>
                <p>Comments: {recipe.commentCount}</p>
                <p>Favorites: {recipe.favoriteCount}</p>
            </div>
            {onDelete && (
                <Button onClick={handleButtonClick} className="btn-delete">Delete</Button>
            )}
        </div>
    );
};

export default RecipeCard;
