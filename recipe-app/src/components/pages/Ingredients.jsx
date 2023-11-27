import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Table from '../layout/Table';
import SearchBar from '../common/Searchbar';
import CreateIngredientModal from '../modals/ingredients/CreateIngredientModal';
import EditIngredientModal from '../modals/ingredients/EditIngredientModal';
import IngredientDetailsModal from '../modals/ingredients/IngredientDetailsModal';
import ApiService from '../../services/ApiService';
import './Ingredients.scss';

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [editingIngredient, setEditingIngredient] = useState(null);

    // 加载初始数据
    useEffect(() => {
        ApiService.fetchIngredients()
        .then(response => {
            if (Array.isArray(response.data)) {
                setIngredients(response.data);
            } else {
                console.error('Unable to fetch ingredients.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            // 错误处理逻辑
        });
    }, []);
    

    const handleCreate = (newIngredient) => {
        console.log('Creating new ingredient:', newIngredient);
        ApiService.createIngredient(newIngredient)
        .then(addedIngredient => {
            setIngredients([...ingredients, addedIngredient.ingredient]);
            setShowCreateModal(false);
        })
        .catch(error => console.error(error)); 
    };

    const handleViewDetails = (ingredient) => {
        const ingredientId = ingredient.id;
            ApiService.fetchIngredient(ingredientId) // 假设这是一个获取单个食材详细信息的函数
              .then(data => {
                  setSelectedIngredient(data);
                  setShowDetailsModal(true);
              })
              .catch(error => console.error(error));   
    };

    const handleEditIngredient = (ingredient) => {
        setEditingIngredient(ingredient);
        // Open the edit modal here
    };

    const saveEditedIngredient = (updatedIngredientData) => {

        ApiService.updateIngredient(editingIngredient.id, updatedIngredientData)
            .then(updatedIngredient => {
                // Update the Ingredients list with the updated Ingredient
                setIngredients(ingredients.map(ingredient => 
                    ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
                ));
                setEditingIngredient(null); // Reset the editing state to close the modal
                setShowDetailsModal(false); // Close the details modal
            })
            .catch(error => {
                console.error('Error updating ingredient:', error);
                // Handle error (e.g., show a notification to the user)
            });
    };
    
    const handleDelete = (ingredient) => {
        ApiService.deleteIngredient(ingredient.id).then(() => {
            setIngredients(ingredients.filter(r => r.id !== ingredient.id));
        });
    };
    
    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchIngredients(term); // 假设这是一个搜索食材的函数
    };

    // 定义表格列
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Updated At', cell: (row) => row.updatedAt },
    ];

    // 过滤或排序食材列表
    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())

    );

    return (
        <div>
            <div className="top-bar">
                <Button className="btn-create"  onClick={() => setShowCreateModal(true)}>Add New</Button>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <Table 
                columns={columns} 
                data={filteredIngredients} 
                onViewDetails={handleViewDetails} 
                onDelete={handleDelete}
            />
            {showCreateModal && (
                <CreateIngredientModal 
                    isOpen={showCreateModal} 
                    onClose={() => setShowCreateModal(false)} 
                    onCreate={handleCreate}
                />
            )}
            {showDetailsModal && (
                <IngredientDetailsModal 
                    isOpen={showDetailsModal} 
                    onClose={() => setShowDetailsModal(false)} 
                    ingredient={selectedIngredient}
                    onEdit={handleEditIngredient}
                />
            )}
            {editingIngredient && (
                <EditIngredientModal
                    isOpen={!!editingIngredient}
                    onClose={() => setEditingIngredient(null)}
                    onEdit={saveEditedIngredient}
                    ingredientData={editingIngredient}
                /> 
            )}
        </div>
    );
};

export default Ingredients;

// Path: recipe-app/src/components/pages/Ingredients.jsx