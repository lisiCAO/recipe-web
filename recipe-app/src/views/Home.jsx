import React, { useState, useEffect, useContext } from 'react';
import RecipeList from './../components/pages/regular/recipes/RecipeList';
import RecipeDetails from './../components/pages/RecipeDetails';
import SearchBar from './../components/common/Searchbar';
import ApiService from './../services/ApiService';
import { UserContext } from './../contexts/UserContext';
import { MessageContext } from './../contexts/MessageContext';
import './Home.scss';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // search term
    const { isLoggedIn, setShowLoginModal } = useContext(UserContext);
    const { showMessage, hideMessage } = useContext(MessageContext);
    
    useEffect(() => {
        ApiService.fetchRecipes()
        .then(response => {
            if (Array.isArray(response)) {
                setRecipes(response);
                console.log(response);
            }
            else {
                console.error('Unable to fetch recipes.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            setRecipes([]);
        });
    }, []);

    const handleViewDetails = (recipe) => {
        const recipeId = recipe.id;
        ApiService.fetchRecipe(recipeId) 
        .then(data => {
            setSelectedRecipe(data);
        })
        .catch(error => {
            console.error(error);
            setSelectedRecipe(null);
        });
    }

    const handleBackToList = () => {
        setSelectedRecipe(null); // Clear the selected recipe
        hideMessage(); // Clear any messages
    };

    const handleToggleFavorite = async (recipeId) => {
        try {
            if (!isLoggedIn) {
                showMessage('error', 'Please log in to favorite recipes.');
                setShowLoginModal(true);
                return;
            }

            // fetch the recipe to get the current favorite status
            const isCurrentlyFavorited = recipes.find(recipe => recipe.id === recipeId).isFavorited;
    
            let updatedStatus;
            if (isCurrentlyFavorited) {
                // 如果当前已收藏，发送 DELETE 请求移除收藏
                await ApiService.deleteFavoriteRecipeByUser(recipeId);
                updatedStatus = false; // 设置为未收藏状态
            } else {
                // 如果当前未收藏，发送 POST 请求添加收藏
                await ApiService.addFavoriteRecipeByUser(recipeId);
                updatedStatus = true; // 设置为已收藏状态
            }
    
            // 更新食谱列表中的收藏状态
            setRecipes(recipes.map(recipe => 
                recipe.id === recipeId ? { ...recipe, isFavorited: updatedStatus } : recipe
            ));
    
            // 如果选中的食谱是当前操作的食谱，更新其收藏状态
            if (selectedRecipe && selectedRecipe.id === recipeId) {
                setSelectedRecipe({ ...selectedRecipe, isFavorited: updatedStatus });
            }
        } catch (error) {
            console.error('Error toggling favorite status', error);
        }
    };
    

    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchRecipes(term); // TODO: Implement search
    };

    // Filter or sort the recipes list
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    )|| [];

    return (
        <div className="home-page">
            <main className="welcome-section">
                <h1>Welcome to Our Application</h1>
                {selectedRecipe ? (
                    <>
                        <button onClick={handleBackToList}>Back to List</button>
                        <RecipeDetails recipe={selectedRecipe} onToggleFavorite={handleToggleFavorite} />
                    </>
                ) : (
                    <>
                        <SearchBar value={searchTerm} onChange={handleSearch} />
                        <RecipeList recipes={filteredRecipes} onRecipeSelect={handleViewDetails} onToggleFavorite={handleToggleFavorite} />
                    </>
                )}
            </main>
        </div>
    )};

export default Home;
// Path: recipe-app/src/views/Home.jsx