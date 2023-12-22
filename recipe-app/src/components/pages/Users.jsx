import React, { useState, useEffect, useContext } from 'react';
import Button from '../common/Button';
import Table from '../layout/Table';
import SearchBar from '../common/Searchbar';
import CreateUserModal from '../modals/users/CreateUserModal';
import EditUserModal from '../modals/users/EditUserModal';
import UserDetailsModal from '../modals/users/UserDetailsModal';
import ApiService from '../../services/ApiService';
import { MessageContext } from '../common/MessageContext';
import './Users.scss';

const Users = () => {
    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');

    const { showMessage, hideMessage } = useContext(MessageContext);

    // load initial data
    useEffect(() => {
        ApiService.fetchUsers()
        .then(response => {
            if (Array.isArray(response)) {
                setUsers(response);
            } else {
                console.error('Unable to fetch Users.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            // showMessage('error', 'Unable to fetch recipes.');
            setUsers([]);
        });
    }, []);

    const handleCreate = async (newUser) => {
        console.log('Creating new User:', newUser);
        await ApiService.createUser(newUser)
        .then(addedUser => {
            setUsers([...users, addedUser.user]);
            setShowCreateModal(false);
            showMessage('success', 'User created successfully');
        })
    };

    const handleViewDetails = (user) => {
        const userId = user.id;
            ApiService.fetchUser(userId) 
              .then(data => {
                console.log('User details from user page:', data);
                setSelectedUser(data);
                console.log('Selected user:', selectedUser);
                setShowDetailsModal(true);
              })
              .catch(error => {console.error(error); setEditingUser(null)});   
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowDetailsModal(false);
        // Open the edit modal here
    };

    const saveEditedUser = async (updatedUserData) => {
        console.log('Updating User:', updatedUserData);
        await ApiService.updateUser(editingUser.id, updatedUserData)
            .then(updatedUser => {
                console.log('updatedUser',updatedUser);
                // Update the Users list with the updated User
                setUsers(users.map(user => 
                    user.id === updatedUser.user.id ? updatedUser.user : user
                ));
                setEditingUser(null); // Reset the editing state to close the modal
                setShowDetailsModal(false); // Close the details modal
                showMessage('success', 'User updated successfully');
            })
    };

    const handleDelete = (user) => {
        ApiService.deleteUser(user.id).then(() => {
            setUsers(users.filter(r => r.id !== user.id));
        });
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchUsers(term); // searchUsers is a function that searches the users
    };

    // Table columns
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Email', cell: (row) => row.email },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Category', cell: (row) => row.category },
    ];
    

    // Filter the users based on the search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || []
    );

    return (
        <div>
            <div className="top-bar">
                <Button className="btn-create" onClick={() => setShowCreateModal(true)}>Add New</Button>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <Table 
                columns={columns} 
                data={filteredUsers} 
                onViewDetails={handleViewDetails} 
                onDelete={handleDelete}
            />
            {showCreateModal && (
                <CreateUserModal 
                    isOpen={showCreateModal} 
                    onClose={() => {setShowCreateModal(false);  hideMessage();}} 
                    onCreate={handleCreate}
                />
            )}
            {showDetailsModal && (
                <UserDetailsModal 
                    isOpen={showDetailsModal} 
                    onClose={() => setShowDetailsModal(false)} 
                    user={selectedUser}
                    onEdit={handleEditUser}
                />
            )}
            {editingUser && (
                <EditUserModal
                    isOpen={!!editingUser}
                    onClose={() => { setEditingUser(null); setShowDetailsModal(false); hideMessage(); }}
                    onEdit={saveEditedUser}
                    userData={editingUser}
                /> 
            )}
        </div>
    );
};


export default Users;