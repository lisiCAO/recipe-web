import React from 'react';
import './RecipeCard.scss'; 



const RecipeCard = ({recipe}) => {
  
    return (
              <div className="recipe-card">
                <div className="recipe-card-image">
                  <img src={recipe.recipe_image_path} alt={recipe.name} />
                </div>
  
                <div className="recipe-card-content">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>
                </div>
              </div>
          )
}

export default RecipeCard;