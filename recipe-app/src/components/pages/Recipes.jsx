import React, { useState, useEffect, useContext } from 'react';
import Button from '../common/Button';
import Table from '../layout/Table';
import SearchBar from '../common/Searchbar';
import CreateRecipeModal from '../modals/recipes/CreateRecipeModal';
import EditRecipeModal from '../modals/recipes/EditReipeModal';
import RecipeDetailsModal from '../modals/recipes/RecipeDetailsModal';
import ApiService from '../../services/ApiService';
import { MessageContext } from './../common/MessageContext';
import Message from './../common/Message';
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

    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [editingRecipe, setEditingRecipe] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const { showMessage, hideMessage } = useContext(MessageContext); 
    const [message] = useState({type: '', text: ''});

    // load initial data
    useEffect(() => {
        ApiService.fetchRecipes()
        .then(response => {
                setRecipes(response);
        })
        .catch(error => {
            console.error(error);
            // showMessage('error', 'Unable to fetch recipes.');
        });
    }, []);

    const handleCreate = async (newRecipe) => { // async/await
            console.log('Creating new recipe:', newRecipe);
            const addedRecipe = await ApiService.createRecipe(newRecipe);
            console.log('Added recipe:', addedRecipe);
            setRecipes([...recipes, addedRecipe]);
            setShowCreateModal(false);
            showMessage('success', 'Recipe created successfully');
    }

    const handleViewDetails = (recipe) => {
        const recipeId = recipe.id;
            ApiService.fetchRecipe(recipeId) 
              .then(data => {
                console.log('Recipe details from recipes page, by id:', data);
                  setSelectedRecipe(data);
                  setShowDetailsModal(true);
              })
              .catch(error => {console.error(error) });   
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
        setEditingRecipe(null); // Reset the editing state to close the modal
        setShowDetailsModal(false); // Close the details modal
        showMessage('success', 'Recipe updated successfully');
    };
    
    
    const handleDelete = (recipe) => {
        ApiService.deleteRecipe(recipe.id).then(() => {
            setRecipes(recipes.filter(r => r.id !== recipe.id));
        });
    };
    

    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchRecipes(term); // 假设这是一个搜索食谱的函数
    };

    // Filter or sort the recipes list
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    onClose={() => {setShowCreateModal(false);  hideMessage();}} 
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
                    onClose={() => {setEditingRecipe(null); setShowDetailsModal(true); hideMessage();}}
                    onEdit={saveEditedRecipe}
                    recipeData={editingRecipe}
                /> 
            )}
        </div>
    );
};

export default Recipes;

// Path: recipe-app/src/components/pages/Recipes.jsx