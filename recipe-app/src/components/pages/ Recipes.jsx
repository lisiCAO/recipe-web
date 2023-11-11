import React, { useState, useEffect } from 'react';
import SearchBar from '../common/Searchbar';
import Table from '../common/Table';
import RecipeDetailsModal from '../modals/RecipeDetailsModal';
import Button from '../common/Button';
import './Recipes.scss';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]); 
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    

    useEffect(() => {
        fetch('http://localhost:3001/recipes')
            .then(res => res.json())
            .then(data => {
                setRecipes(data);
                setFilteredRecipes(data);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        if(!searchTerm) {
            setFilteredRecipes(recipes);
            setSearchQuery('');
            return;
        } else {
            const filtered = recipes.filter(recipe => 
                recipe.recipe_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRecipes(filtered);
            setSearchQuery(searchTerm);
        }
    };

    const openModal = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRecipe(null);
    }

    const handleDelete = (recipeId) => {
        const filtered = recipes.filter(recipe => recipe.id !== recipeId);
        setRecipes(filtered);
        setFilteredRecipes(filtered);
    };

    const handleAddNew = () => {
        alert('Add new recipe');

    }

    return (
        <div className="recipes-page">
            <div className="recipes-header">
                <h1>Recipes</h1>
                <Button onClick={handleAddNew}>Add New</Button>
            </div>
            <SearchBar value={searchQuery} onChange={handleSearch} />
            <Table
                columns={['Name', 'Description', 'Category', 'Actions']}
                data={filteredRecipes}
                onRowClick={openModal}
                onDelete={handleDelete}
            />
            {isModalOpen && <RecipeDetailsModal recipe={selectedRecipe} onClose={closeModal} />}
        </div>
    );
};

export default Recipes;


