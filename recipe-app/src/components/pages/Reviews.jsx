import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Table from '../layout/Table';
import SearchBar from '../common/Searchbar';
import CreateReviewModal from '../modals/reviews/CreateReviewModal';
import EditReviewModal from '../modals/reviews/EditReviewModal';
import ReviewDetailsModal from '../modals/reviews/ReviewDetailsModal';
import ApiService from '../../services/ApiService';
import './Reviews.scss';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [editingReview, setEditingReview] = useState(null);


    // 加载初始数据
    useEffect(() => {
        ApiService.fetchReviews()
        .then(response => {
            if (Array.isArray(response)) {
                setReviews(response);
            } else {
                console.error('Unable to fetch reviews.');
                return [];
            }
        })
        .catch(error => {
            console.error(error);
            // 错误处理逻辑
        });
    }, []);
    

    const handleCreate = (newReview) => {
        console.log('Creating new review:', newReview);
        ApiService.createReview(newReview)
        .then(addedReview => {
            setReviews([...reviews, addedReview.review]);
            setShowCreateModal(false);
        })
        .catch(error => console.error(error)); 
    };

    const handleViewDetails = (review) => {
        const reviewId = review.id;
            ApiService.fetchReview(reviewId) // 假设这是一个获取单个评论详细信息的函数
              .then(data => {
                  setSelectedReview(data);
                  setShowDetailsModal(true);
              })
              .catch(error => console.error(error));   
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
        // Open the edit modal here
    };

    const saveEditedReview = (updatedReviewData) => {

        ApiService.updateReview(editingReview.id, updatedReviewData)
            .then(updatedReview => {
                // Update the reviews list with the updated review
                setReviews(reviews.map(review => 
                    review.id === updatedReview.id ? updatedReview : review
                ));
                setEditingReview(null); // Reset the editing state to close the modal
                setShowDetailsModal(false); // Close the details modal
            })
            .catch(error => {
                console.error('Error updating review:', error);
                // Handle error (e.g., show a notification to the user)
            });
    };
    
    

    const handleDelete = (review) => {
        ApiService.deleteReview(review.id).then(() => {
            setReviews(reviews.filter(r => r.id !== review.id));
        });
    };
    

    const handleSearch = (term) => {
        setSearchTerm(term);
        // searchReviews(term); // 假设这是一个搜索评论的函数
    };

    // 定义表格列
    const columns = [
        { header: 'Title', cell: (row) => row.recipeName },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Created By', cell: (row) => row.userName },
    ];
    

    // 过滤或排序评论列表
    const filteredReviews = reviews.filter(review =>
        review.recipeName.toLowerCase().includes(searchTerm.toLowerCase())

    );

    return (
        <div>
            <div className="top-bar">
                <Button className="btn-create" onClick={() => setShowCreateModal(true)}>Add New</Button>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <Table 
                columns={columns} 
                data={filteredReviews} 
                onViewDetails={handleViewDetails} 
                onDelete={handleDelete}
            />
            {showCreateModal && (
                <CreateReviewModal 
                    isOpen={showCreateModal} 
                    onClose={() => setShowCreateModal(false)} 
                    onCreate={handleCreate}
                />
            )}
            {showDetailsModal && (
                <ReviewDetailsModal 
                    isOpen={showDetailsModal} 
                    onClose={() => setShowDetailsModal(false)} 
                    review={selectedReview}
                    onEdit={handleEditReview}
                />
            )}
            {editingReview && (
                <EditReviewModal
                    isOpen={!!editingReview}
                    onClose={() => setEditingReview(null)}
                    onEdit={saveEditedReview}
                    reviewData={editingReview}
                /> 
            )}
        </div>
    );
};

export default Reviews;

// Path: recipe-app/src/components/pages/Reviews.jsx