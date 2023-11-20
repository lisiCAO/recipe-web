import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Table from '../layout/Table';
import SearchBar from '../common/Searchbar';
import CreateUserModal from '../modals/users/CreateUserModal';
import EditUserModal from '../modals/users/EditUserModal';
import UserDetailsModal from '../modals/users/UserDetailsModal';
import ApiService from '../../services/ApiService';
import './Users.scss';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);


    // 加载初始数据
    useEffect(() => {
        ApiService.fetchUsers()
        .then(response => {
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('Unable to fetch Users.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            // 错误处理逻辑
        });
    }, []);
    

    const handleCreate = (newUser) => {
        console.log('Creating new User:', newUser);
        ApiService.createUser(newUser)
        .then(addedUser => {
            setUsers([...users, addedUser.user]);
            setShowCreateModal(false);
        })
        .catch(error => console.error(error)); 
    };

    const handleViewDetails = (user) => {
        const userId = user.id;
            ApiService.fetchUser(userId) // 假设这是一个获取单个用户详细信息的函数
              .then(data => {
                  setSelectedUser(data);
                  setShowDetailsModal(true);
              })
              .catch(error => console.error(error));   
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        // Open the edit modal here
    };

    const saveEditedUser = (updatedUserData) => {

        ApiService.updateUser(editingUser.id, updatedUserData)
            .then(updatedUser => {
                // Update the Users list with the updated User
                setUsers(users.map(user => 
                    user.id === updatedUser.id ? updatedUser : user
                ));
                setEditingUser(null); // Reset the editing state to close the modal
                setShowDetailsModal(false); // Close the details modal
            })
            .catch(error => {
                console.error('Error updating User:', error);
                // Handle error (e.g., show a notification to the user)
            });
    };
    
    

    const handleDelete = (user) => {
        ApiService.deleteUser(user.id).then(() => {
            setUsers(users.filter(r => r.id !== user.id));
        });
    };
    

    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchUsers(term); // 假设这是一个搜索食谱的函数
    };

    // 定义表格列
    const columns = [
        { header: 'Name', cell: (row) => row.name },
        { header: 'Email', cell: (row) => row.email },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Updated At', cell: (row) => row.updatedAt },
        { header: 'Category', cell: (row) => row.category },
    ];
    

    // 过滤或排序用户列表
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="top-bar">
                <Button onClick={() => setShowCreateModal(true)}>Add New</Button>
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
                    onClose={() => setShowCreateModal(false)} 
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
                    onClose={() => setEditingUser(null)}
                    onEdit={saveEditedUser}
                    userData={editingUser}
                /> 
            )}
        </div>
    );
};


export default Users;