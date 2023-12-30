import React, { useState, useEffect } from 'react';
import RecipeCard from '../../../common/RecipeCard'; 

const RecipeList = ({ recipes = [], onRecipeSelect, onDelete } ) => {
    
    return (
        <div className="user-recipe-list">
            {recipes.map(recipe => (
                console.log('recipe:', recipe),
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onOpenDetails={() => onRecipeSelect(recipe)} // 使用回调
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default RecipeList;
