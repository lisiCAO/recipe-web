import React, { useState, useEffect} from 'react';
import ApiService from '../../../services/ApiService';
import Table from './../../layout/Table';
import SearchBar from './../../common/Searchbar';
import ConfirmModal from './../../modals/ConfirmModal';
import RecipeDetailsModal from './../../modals/recipes/RecipeDetailsModal';

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [reviewToDelete, setReviewToDelete] = useState(null); // review to delete
    const [searchTerm, setSearchTerm] = useState('');
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false); 

    // load initial data
    useEffect(() => {
        ApiService.fetchReviewsByUser()
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
            setReviews([]);
        });
    }, []);
    

    const handleViewDetails = (review) => {
        const reviewId = review.id;
            ApiService.fetchRecipeByReview(reviewId) // Fetch the review details
              .then(data => {
                setSelectedRecipe(data);
                setShowDetailsModal(true);
              })
              .catch(error => {console.error(error)}) // Handle error
    };

    const confirmDelete = (review) => {
        setReviewToDelete(review);
        setShowConfirmModal(true);
    };

    const handleDeleteConfirmed = () => {
        if (reviewToDelete) {
            ApiService.deleteReview(reviewToDelete.id).then(() => {
                setReviews(reviews.filter(r => r.id !== reviewToDelete.id));
                setReviewToDelete(null);
            });
        }
        setShowConfirmModal(false);
    };

    const handleCancelDelete = () => {
        setReviewToDelete(null);
        setShowConfirmModal(false);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Table columns
    const columns = [
        { header: 'Title', cell: (row) => row.recipeName },
        { header: 'Created At', cell: (row) => row.createdAt },
        { header: 'Created By', cell: (row) => row.userName },
    ];
    
    // Filter or sort the reviews list
    const filteredReviews = reviews.filter(review =>
        review.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="top-bar">
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>
            <Table 
                columns={columns} 
                data={filteredReviews} 
                onViewDetails={handleViewDetails} 
                onDelete={confirmDelete}
            />
            {showDetailsModal && (
                <RecipeDetailsModal 
                    isOpen={showDetailsModal} 
                    onClose={() => setShowDetailsModal(false)} 
                    recipe={selectedRecipe}
                />
            )}
            <ConfirmModal 
                isOpen={showConfirmModal}
                title="Confirm Delete"
                message="Are you sure you want to delete this review?"
                onConfirm={handleDeleteConfirmed}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default UserReviews;
