import React, { useState, useEffect, useContext, useCallback } from 'react';
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
    const [refreshFavorites, setRefreshFavorites] = useState(false);
    
    useEffect(() => {
        const fetchRecipesAndFavorites = async () => {
            try {
                const recipesData = await ApiService.fetchRecipes();
                if (!Array.isArray(recipesData)) {
                    console.error('Unable to fetch recipes.');
                    return;
                }
    
                let updatedRecipes = recipesData.map(recipe => ({
                    ...recipe,
                    isFavorited: false, // 默认设置为false
                }));
    
                if (isLoggedIn) {
                    // 如果用户已登录，获取收藏状态并更新食谱列表
                    const userFavorites = await ApiService.fetchFavoriteRecipeByUser();
                    const userFavoritesIds = new Set(userFavorites.map(favorite => favorite.recipeId));
                    updatedRecipes = updatedRecipes.map(recipe => ({
                        ...recipe,
                        isFavorited: userFavoritesIds.has(recipe.id),
                    }));
                    console.log('updatedRecipes', updatedRecipes);
                }
                setRecipes(updatedRecipes);
            } catch (error) {
                console.error('Error fetching recipes and favorites:', error);
                setRecipes([]);
            }
        };
    
        fetchRecipesAndFavorites();
    }, [isLoggedIn, refreshFavorites]); // 依赖项为isLoggedIn
    
    

    const handleViewDetails = (recipe) => {
        const recipeId = recipe.id;
        console.log('recipe', recipe);
        ApiService.fetchRecipe(recipeId) 
        .then(data => {
            // update selected recipe's favorite status
            const updatedRecipe = { ...data, isFavorited: recipe.isFavorited };
            setSelectedRecipe(updatedRecipe);
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

    const handleToggleFavorite = useCallback(async (recipeId) => {
            if (!isLoggedIn) {
                showMessage('error', 'Please log in to favorite recipes.');
                setShowLoginModal(true);
                return;
            }
            const recipeToUpdate = recipes.find(recipe => recipe.id === recipeId);
            if (!recipeToUpdate) {
                console.error('Recipe not found');
                return;
            }
        
            try {

                const apiFunction = recipeToUpdate.isFavorited ? ApiService.deleteFavoriteRecipeByUser : ApiService.addFavoriteRecipeByUser;
                await apiFunction(recipeId);
                const updatedRecipes = recipes.map(recipe =>
                    recipe.id === recipeId ? { ...recipe, isFavorited: !recipe.isFavorited } : recipe
                );
        
                setRecipes(updatedRecipes);
                if (selectedRecipe && selectedRecipe.id === recipeId) {
                    setSelectedRecipe({ ...selectedRecipe, isFavorited: !selectedRecipe.isFavorited });
                }
            } catch (error) {
                console.error('Error toggling favorite status', error);
            };
            setRefreshFavorites(prev => !prev);
        }, [recipes, selectedRecipe, isLoggedIn, showMessage, setShowLoginModal, setRefreshFavorites]);
    
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