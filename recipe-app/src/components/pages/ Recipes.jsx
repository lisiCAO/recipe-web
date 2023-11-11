import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Table from '../common/Table';
import SearchBar from '../common/Searchbar';
import CreateRecipeModal from '../modals/CreateRecipeModal.jsx';
import RecipeDetailsModal from '../modals/RecipeDetailsModal.jsx';
import './Recipes.scss';

const Recipes = () => {
    const [recipes, setRecipes] = useState([
        { id: 1, name: 'Spaghetti Carbonara', description: 'A classic Italian dish', cookingTime: 30 },
        { id: 2, name: 'Margherita Pizza', description: 'Simple yet delicious', cookingTime: 50 },
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // 加载初始数据
    useEffect(() => {
        // fetchRecipes(); // 假设这是一个加载食谱数据的函数
    }, []);

    const handleCreate = (newRecipe) => {
        // addRecipe(newRecipe); // 假设这是一个添加食谱的函数
        setShowCreateModal(false);
        // 可能还需要更新食谱列表
    };

    const handleViewDetails = (recipe) => {
        setSelectedRecipe(recipe);
        setShowDetailsModal(true);
    };

    const handleDelete = (recipe) => {
        // deleteRecipe(recipe); // 假设这是一个删除食谱的函数
        // 可能还需要更新食谱列表
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchRecipes(term); // 假设这是一个搜索食谱的函数
    };

    // 定义表格列
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Description', cell: (row) => row.description },
        { header: 'Cooking Time', cell: (row) => `${row.cookingTime} mins` },
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
                />
            )}
        </div>
    );
};

export default Recipes;

// Path: recipe-app/src/components/pages/Recipes.jsx