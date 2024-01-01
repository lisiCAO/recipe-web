import React, { useContext } from 'react';
import DetailContent from './../common/DetailContent';
import FavoriteButton from './../common/FavoriteButton';
import Message from './../common/Message';
import { MessageContext } from './../../components/common/MessageContext';
import Reviews from './Reviews';
import './RecipeDetails.scss';
const RecipeDetail = ({ recipe, onToggleFavorite }) => {
    const config = {
        title: 'name',
        image: 'imagePath',
        instructions: 'instructions',
        ingredients: 'ingredients',
        createdBy: 'createdBy',
        createdAt: 'createdAt',
        ignoreFields: ['id', 'isFavorited']
    };

    const { message } = useContext(MessageContext);


    return (
        <div className="recipe-detail-container">
            <DetailContent data={recipe} config={config} />
            <FavoriteButton 
                isFavorited={recipe.isFavorited} 
                onToggle={() => onToggleFavorite(recipe.id)} 
            />
            <Message message={message} />
            <Reviews recipeId={recipe.id} />
        </div>
    );
};

export default RecipeDetail;
