import React, { useState, useEffect } from 'react';
import RecipeCard from '../../../common/RecipeCard'; 

const RecipeList = ({ recipes, onRecipeSelect } ) => {
    return (
        <div className="user-recipe-list">
            {recipes.map(recipe => (
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onOpenDetails={() => onRecipeSelect(recipe)} // 使用回调
                />
            ))}
        </div>
    );
};

export default RecipeList;
