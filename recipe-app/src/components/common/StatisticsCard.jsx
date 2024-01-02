import React from 'react';
import './StatisticsCard.scss';

const camelCaseToNormal = (text) => {
    // transform camelCase to normal text
    return text
        .replace(/([A-Z])/g, ' $1') // insert a space before all caps
        .replace(/^./, (str) => str.toUpperCase()); // uppercase the first character
};
const StatisticsCard = ({ title, data, onClick}) => {
    const renderDataContent = (key, value) => {
        let displayKey = camelCaseToNormal(key);

        if (key === 'mostPopularRecipe' || key === 'mostUsedIngredient') {
            // display recipe name and count
            return <p key={key}>{`${displayKey}: ${value.name||value.recipe_name} (Count: ${value.recipes_count || value.reviews_count})`}</p>;
        } else if (key === 'recentReviews') {
            // display recipe name and comment
            return value.map(review => (
                <p key={review.id}>{`${review.recipeName}: ${review.comment}`}</p>
            ));
        } else {
            // display key and value
            return <p key={key}>{`${displayKey}: ${value}`}</p>;
        }
    };

    return (
        <div className="statistics-card" onClick={onClick}>
            <h2>{title}</h2>
            {Object.entries(data).map(([key, value]) => renderDataContent(key, value))}
        </div>
    );
};

export default StatisticsCard;
