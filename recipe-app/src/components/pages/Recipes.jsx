import React, { useState, useEffect, useContext } from 'react';
import Button from '../common/Button';
import Table from '../layout/Table';
import SearchBar from '../common/Searchbar';
import CreateRecipeModal from '../modals/recipes/CreateRecipeModal';
import EditRecipeModal from '../modals/recipes/EditReipeModal';
import RecipeDetailsModal from '../modals/recipes/RecipeDetailsModal';
import ApiService from '../../services/ApiService';
import { MessageContext } from './../common/MessageContext';
import './Recipes.scss';

/** 
 * Recipes page component
 * 
 * @returns {JSX.Element}
 * 
 * @example
 * <Recipes />
 * 
 * @category Components
 * 
 */
const Recipes = () => {

    const [recipes, setRecipes] = useState([]); // recipes list
    const [selectedRecipe, setSelectedRecipe] = useState(null); // selected recipe
    const [editingRecipe, setEditingRecipe] = useState(null); // editing recipe

    const [searchTerm, setSearchTerm] = useState(''); // search term

    const [showCreateModal, setShowCreateModal] = useState(false); // show/hide create modal
    const [showDetailsModal, setShowDetailsModal] = useState(false); // show/hide details modal

    const { showMessage, hideMessage } = useContext(MessageContext); // Show/hide message

    // load initial data
    useEffect(() => {
        ApiService.fetchRecipes()
        .then(response => {
            if (Array.isArray(response)) {
                setRecipes(response);
            }
            else {
                console.error('Unable to fetch recipes.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            // showMessage('error', 'Unable to fetch recipes.');
            setRecipes([]);
        });
    }, []);

    const handleCreate = async (newRecipe) => { // async/await
            console.log('Creating new recipe:', newRecipe);
            const addedRecipe = await ApiService.createRecipe(newRecipe);
            console.log('Added recipe:', addedRecipe);
            setRecipes([...recipes, addedRecipe]);
            showMessage('success', 'Recipe created successfully');
            setTimeout(() => {
                setShowCreateModal(false);
                hideMessage();
            }, 3000);
    }

    const handleViewDetails = (recipe) => {
        const recipeId = recipe.id;
            ApiService.fetchRecipe(recipeId) 
              .then(data => {
                console.log('Recipe details from recipes page, by id:', data);
                setSelectedRecipe(data);
                setShowDetailsModal(true);
              })
              .catch(error => {console.error(error);setEditingRecipe(null);}) // Reset the editing state to close the modal 
              
    };

    // Open and pass the recipe data to the edit modal, then close the details modal
    const handleEditRecipe = (recipe) => {
        setEditingRecipe(recipe);
        setShowDetailsModal(false);
    };

    // Save the edited recipe data
    const saveEditedRecipe = async (updatedRecipeData) => {
        console.log('Updated recipe data:', updatedRecipeData);
        const updatedRecipe = await ApiService.updateRecipe(editingRecipe.id, updatedRecipeData);
        console.log('Updated recipe:', updatedRecipe);
        setRecipes(recipes.map(recipe => 
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ));
        showMessage('success', 'Recipe updated successfully');
        setTimeout(() => {
            setEditingRecipe(null); 
            setShowDetailsModal(false); 
            hideMessage();}
            , 3000);
    };
    
    
    const handleDelete = (recipe) => {
        ApiService.deleteRecipe(recipe.id).then(() => {
            setRecipes(recipes.filter(r => r.id !== recipe.id));
        });
    };
    

    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchRecipes(term); // TODO: Implement search
    };

    // Filter or sort the recipes list
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    )|| [];

    // Table columns
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Updated At', cell: (row) => row.updatedAt },
        { header: 'Created By', cell: (row) => row.createdBy },
    ];
    
    return (
        <div>
            <div className="top-bar">
                <Button className="btn-create"  onClick={() => setShowCreateModal(true)}>Add New</Button>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            {/* <Message message = {message}/> */}
            <Table 
                columns={columns} 
                data={filteredRecipes} 
                onViewDetails={handleViewDetails} 
                onDelete={handleDelete}
            />
            {showCreateModal && (
                <CreateRecipeModal 
                    isOpen={showCreateModal} 
                    onClose={() => {            
                        setTimeout(() => {
                        setShowCreateModal(false);
                        hideMessage();
                    }, 3000);}} 
                    onCreate={handleCreate}
                />
            )}
            {showDetailsModal && (
                <RecipeDetailsModal 
                    isOpen={showDetailsModal} 
                    onClose={() => setShowDetailsModal(false)} 
                    recipe={selectedRecipe}
                    onEdit={handleEditRecipe}
                />
            )}
            {editingRecipe && (
                <EditRecipeModal
                    isOpen={editingRecipe}
                    onClose={() => {
                        setTimeout(() => {
                            setEditingRecipe(null); 
                            setShowDetailsModal(false); 
                            hideMessage();}
                            , 3000);}}
                    onEdit={saveEditedRecipe}
                    recipeData={editingRecipe}
                /> 
            )}
        </div>
    );
};

export default Recipes;

// Path: recipe-app/src/components/pages/Recipes.jsx