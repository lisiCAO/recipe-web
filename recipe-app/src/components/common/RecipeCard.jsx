import React from 'react';
import Button from './Button';
import FavoriteButton from './FavoriteButton';
import './RecipeCard.scss';

const RecipeCard = ({ recipe, onOpenDetails, onDelete, onToggleFavorite }) => {
    const handleButtonClick = (event) => {
        event.stopPropagation(); // 阻止事件冒泡
        if (onDelete) {
            onDelete(recipe);
        }
        if (onToggleFavorite) {
            onToggleFavorite(recipe.id);
        }
    };
    return (
        <div className="recipe-card" onClick={() => onOpenDetails(recipe)}>
            <img src={`http://localhost:8000${recipe.imagePath}`} alt={recipe.name} />
            <div className="recipe-info">
                <h3>{recipe.name}</h3>
                <p>Comments: {recipe.reviewsCount}</p>
                <p>Favorites: {recipe.favoritesCount}</p>
            </div>
            {onDelete && (
                <Button onClick={handleButtonClick} className="btn-delete">Delete</Button>
            )}
            {onToggleFavorite && (
                <FavoriteButton 
                isFavorited={recipe.isFavorited} 
                onToggle={()=> onToggleFavorite(recipe.id)} />
            )
            }
        </div>
    );
};

export default RecipeCard;

// Path: recipe-app/src/components/common/RecipeCard.jsx