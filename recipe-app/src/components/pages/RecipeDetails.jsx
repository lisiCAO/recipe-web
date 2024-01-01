import React from 'react';
import DetailContent from './../common/DetailContent';
import FavoriteButton from './../common/FavoriteButton';
import Reviews from './Reviews';

const RecipeDetail = ({ recipe, onToggleFavorite }) => {
    const config = {
        title: 'name',
        image: 'imagePath',
        instructions: 'instructions',
        createdBy: 'createdBy',
        createdAt: 'createdAt',
        ignoreFields: ['id', 'createdBy', 'createdAt']
    };

    return (
        <div className="recipe-detail-container">
            <h1>{recipe.name}</h1>
            <DetailContent data={recipe} config={config} />
            <FavoriteButton 
                isFavorited={recipe.isFavorited} 
                onToggle={() => onToggleFavorite(recipe.id)} 
            />
            <Reviews recipeId={recipe.id} />
        </div>
    );
};

export default RecipeDetail;
