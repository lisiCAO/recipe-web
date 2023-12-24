import React, { useState, useEffect, useContext } from 'react';
import Button from '../common/Button';
import Table from '../layout/Table';
import SearchBar from '../common/Searchbar';
import CreateIngredientModal from '../modals/ingredients/CreateIngredientModal';
import EditIngredientModal from '../modals/ingredients/EditIngredientModal';
import IngredientDetailsModal from '../modals/ingredients/IngredientDetailsModal';
import ApiService from '../../services/ApiService';
import { MessageContext } from './../common/MessageContext';
import './Ingredients.scss';

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [editingIngredient, setEditingIngredient] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const { showMessage, hideMessage } = useContext(MessageContext);
    
    // load initial data
    useEffect(() => {
        ApiService.fetchIngredients()
        .then(response => {
            if (Array.isArray(response)) {
                setIngredients(response);
            } else {
                console.error('Unable to fetch ingredients.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            // showMessage('error', 'Unable to fetch ingredients.');
            setIngredients([]);
        });
    }, []);
    

    const handleCreate = async (newIngredient) => {
        console.log('Creating new ingredient:', newIngredient);
        await ApiService.createIngredient(newIngredient)
        .then(addedIngredient => {
            setIngredients([...ingredients, addedIngredient]);
            showMessage('success', 'Ingredient created successfully');
        })
    };

    const handleViewDetails = (ingredient) => {
        const ingredientId = ingredient.id;
            ApiService.fetchIngredient(ingredientId) // fetch the recipe details
              .then(data => {
                console.log('Ingredient details from ingredient page:', data);
                  setSelectedIngredient(data);
                  console.log('Selected ingredient:', selectedIngredient);
                  setShowDetailsModal(true);
              })
              .catch(error => {console.error(error); setEditingIngredient(null)});   
    };

    
    const handleEditIngredient = (ingredient) => { // open the edit modal
        setEditingIngredient(ingredient);
        setShowDetailsModal(false);
    };

    const saveEditedIngredient = async (updatedIngredientData) => {
        console.log('Updating ingredient data:', updatedIngredientData);
        await ApiService.updateIngredient(editingIngredient.id, updatedIngredientData)
            .then(updatedIngredient => {
                console.log('Updated ingredient:', updatedIngredient);
                // Update the Ingredients list with the updated Ingredient
                setIngredients(ingredients.map(ingredient => 
                    ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
                ));
                showMessage('success', 'Ingredient updated successfully');
            })
    };
    
    const handleDelete = (ingredient) => {
        ApiService.deleteIngredient(ingredient.id).then(() => {
            setIngredients(ingredients.filter(r => r.id !== ingredient.id));
        });
    };
    
    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchIngredients(term); // TODO: Implement search
    };

    // Table columns
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Updated At', cell: (row) => row.updatedAt },
    ];

    // Filter or sort the ingredients list
    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())|| []
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
                    onClose={() => {
                        setShowCreateModal(false);
                        hideMessage();}
                    }
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
                    onClose={() => {
                            setEditingIngredient(null); 
                            setShowDetailsModal(false); 
                            hideMessage();
                        }
                    }
                    onEdit={saveEditedIngredient}
                    ingredientData={editingIngredient}
                /> 
            )}
        </div>
    );
};

export default Ingredients;

// Path: recipe-app/src/components/pages/Ingredients.jsx