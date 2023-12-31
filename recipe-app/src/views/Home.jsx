import React, { useState, useEffect } from 'react';
import RecipeList from './../components/pages/regular/recipes/RecipeList';
import DetailContent from './../components/common/DetailContent';
import Reviews from './Reviews';
import ApiService from './../services/ApiService';
import './Home.scss';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        // 获取食谱列表
        ApiService.fetchRecipes().then(setRecipes);
    }, []);

    const handleSelectRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        // 可能还需要加载评论
    };
const Home = () => {
    return (
        <div className="home-page">
            <main className="welcome-section">
                <h1>Welcome to Our Application</h1>
                <RecipeList recipes={recipes} onSelectRecipe={handleSelectRecipe} />
                {selectedRecipe && (
                    <div className="recipe-detail-container">
                        <DetailContent data={selectedRecipe} />
                        <Reviews recipeId={selectedRecipe.id} />
                    </div>
                )}
            </main>
        </div>
    )};
};

export default Home;
// Path: recipe-app/src/views/Home.jsx