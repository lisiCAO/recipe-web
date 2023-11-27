import React from 'react';
import './StatisticsCard.scss';

const camelCaseToNormal = (text) => {
    // 将驼峰命名法转换为单词列表，然后将每个单词的首字母大写
    return text
        .replace(/([A-Z])/g, ' $1') // 在大写字母前添加空格
        .replace(/^./, (str) => str.toUpperCase()); // 将第一个字母转换为大写
};
const StatisticsCard = ({ title, data, onClick}) => {
    const renderDataContent = (key, value) => {
        let displayKey = camelCaseToNormal(key);

        if (key === 'mostPopularRecipe' || key === 'mostUsedIngredient') {
            // 只显示名称和计数
            return <p key={key}>{`${displayKey}: ${value.name||value.recipe_name} (Count: ${value.recipes_count || value.reviews_count})`}</p>;
        } else if (key === 'recentReviews') {
            // 显示食谱名称和评论内容
            return value.map(review => (
                <p key={review.id}>{`${review.recipeName}: ${review.comment}`}</p>
            ));
        } else {
            // 其他类型的数据正常显示
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
