import React from 'react';
import DetailContent from '../../../common/DetailContent';
import Button from '../../../common/Button';
import './RecipeDetails.scss';

function RecipeDetails({ recipe, onEdit }) {
    const recipeConfig = {
        title: 'name',              // 标题字段
        image: 'imagePath',         // 图片字段
        instructions: 'instructions', // 指令字段
        ignoreFields: ['id', 'createdBy', 'createdAt'] // 忽略的字段
    };

    return (
        <div className="recipe-details">
            <h1>Recipe Details</h1>
            <DetailContent data={recipe} config={recipeConfig} />
            <Button onClick={onEdit} className="primary">
                Edit
            </Button>
        </div>
    );
}

export default RecipeDetails;