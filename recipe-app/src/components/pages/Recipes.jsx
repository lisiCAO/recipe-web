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

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const { showMessage } = useContext(MessageContext); 

    // 加载初始数据
    useEffect(() => {
        ApiService.fetchRecipes()
        .then(response => {
            if (Array.isArray(response)) {
                setRecipes(response);
            } else {
                console.error('Unable to fetch recipes.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            // 错误处理逻辑
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
              .catch(error => console.error(error));   
    };

    const handleEditRecipe = (recipe) => {
        setEditingRecipe(recipe);
        setShowDetailsModal(false);
    };

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

        // ApiService.updateRecipe(editingRecipe.id, updatedRecipeData)
        //     .then(updatedRecipe => {
        //         // Update the recipes list with the updated recipe
        //         setRecipes(recipes.map(recipe => 
        //             recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        //         ));
        //         setEditingRecipe(null); // Reset the editing state to close the modal
        //         setShowDetailsModal(false); // Close the details modal
        //         showMessage('success', 'Recipe updated successfully');
        //     })
        //     .catch(error => {
        //         console.error('Error updating recipe:', error);
        //         showMessage('error', 'Error updating recipe');
        //         // Handle error (e.g., show a notification to the user)
        //     });
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

    // 定义表格列
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Updated At', cell: (row) => row.updatedAt },
        { header: 'Created By', cell: (row) => row.createdBy },
    ];
    

    // 过滤或排序食谱列表
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="top-bar">
                <Button className="btn-create"  onClick={() => setShowCreateModal(true)}>Add New</Button>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <Table 
                columns={columns} 
                data={filteredRecipes} 
                onViewDetails={handleViewDetails} 
                onDelete={handleDelete}
            />
            {showCreateModal && (
                <CreateRecipeModal 
                    isOpen={showCreateModal} 
                    onClose={() => setShowCreateModal(false)} 
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
                    onClose={() => {setEditingRecipe(null); setShowDetailsModal(true)}}
                    onEdit={saveEditedRecipe}
                    recipeData={editingRecipe}
                /> 
            )}
        </div>
    );
};

export default Recipes;

// Path: recipe-app/src/components/pages/Recipes.jsx