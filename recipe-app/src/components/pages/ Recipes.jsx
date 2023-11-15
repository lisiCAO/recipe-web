import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Table from '../admin/Table';
import SearchBar from '../admin/Searchbar';
import CreateRecipeModal from '../modals/CreateRecipeModal';
import EditRecipeModal from '../modals/EditReipeModal';
import RecipeDetailsModal from '../modals/RecipeDetailsModal';
import ApiService from '../../services/ApiService';
import './Recipes.scss';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [editingRecipe, setEditingRecipe] = useState(null);


    // 加载初始数据
    useEffect(() => {
        ApiService.fetchRecipes()
        .then(response => {
            if (Array.isArray(response.data)) {
                setRecipes(response.data);
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
    

    const handleCreate = (newRecipe) => {
        ApiService.createRecipe(newRecipe).then(addedRecipe => {
            setRecipes([...recipes, addedRecipe]);
            setShowCreateModal(false);
        });
    };

    const handleViewDetails = (recipe) => {
        const recipeId = recipe.id;
            ApiService.fetchRecipe(recipeId) // 假设这是一个获取单个食谱详细信息的函数
              .then(data => {
                  setSelectedRecipe(data);
                  setShowDetailsModal(true);
              })
              .catch(error => console.error(error));   
    };

    const handleEditRecipe = (recipe) => {
        setEditingRecipe(recipe);
        // Open the edit modal here
    };

    const saveEditedRecipe = (updatedRecipeData) => {

        ApiService.updateRecipe(editingRecipe.id, updatedRecipeData)
            .then(updatedRecipe => {
                // Update the recipes list with the updated recipe
                setRecipes(recipes.map(recipe => 
                    recipe.id === updatedRecipe.id ? updatedRecipe : recipe
                ));
                setEditingRecipe(null); // Reset the editing state to close the modal
                setShowDetailsModal(false); // Close the details modal
            })
            .catch(error => {
                console.error('Error updating recipe:', error);
                // Handle error (e.g., show a notification to the user)
            });
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
                <Button onClick={() => setShowCreateModal(true)}>Add New</Button>
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
                    isOpen={!!editingRecipe}
                    onClose={() => setEditingRecipe(null)}
                    onEdit={saveEditedRecipe}
                    recipeData={editingRecipe}
                /> 
            )}
        </div>
    );
};

export default Recipes;

// Path: recipe-app/src/components/pages/Recipes.jsx