import React, { useState, useEffect } from "react";
import "./Home.scss";

// Import a component to display recipe cards
import RecipeCard from "../components/pages/RecipeCard";

// Import API service to get recipes
import ApiService from "../services/ApiService";

const Home = () => {
    // State to store recipes
    const [recipes, setRecipes] = useState([]);

    // Fetch recipes on component load
    useEffect(() => {
        ApiService.fetchRecipes()
            .then((response) => {
                if (Array.isArray(response)) {
                    setRecipes(response);
                } else {
                    console.error("Unable to fetch recipes.");
                    return [];
                }
            })
            .catch((error) => {
                console.error(error);
                // showMessage('error', 'Unable to fetch recipes.');
                setRecipes([]);
            });
    }, []);

    console.log(recipes);

    return (
        <div className="home-page">
            <main className="recipes-section">
                <h1>Recipes List</h1>

                <div className="recipes-grid">
                    {/* Loop through recipes and display a card for each */}
                    {recipes &&
                        recipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                </div>
            </main>
        </div>
    );
};

export default Home;

// Path: recipe-app/src/views/Home.jsx
