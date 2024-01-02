import React, { useState, useEffect, useRef} from 'react';
import CustomForm from './../common/CustomForm';
import ApiService from './../../services/ApiService';
import './Reviews.scss';
const Reviews = ({ recipeId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            const newReviews = await ApiService.fetchReviewsByRecipe(recipeId, page);
            setReviews((prevReviews) => [...prevReviews, ...newReviews]);
            setLoading(false);
            console.log(newReviews);
        };
        fetchReviews();
    },[recipeId, page]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderRating = (rating) => {
        const filledStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(5 - rating);
        return filledStars + emptyStars;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            root: null,
            threshold: 1.0,
        });
        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    },[]);

    const reviewFormConfig = [
        {
        name: 'rating',
        type: 'number',
        label: 'Rating',
        },
      {
        name: 'comment',
        type: 'textarea',
        label: 'Your Review',
        placeholder: 'Write your review here...',
      },
    ];

    const handleSubmitReview = (reviewData) => {
        ApiService.createReviewByRecipe(recipeId, reviewData).then((newReview) => {
            setReviews([newReview, ...reviews]);
        });
    };

    const handleSubmissionSuccess = () => {
        console.log('Review submitted successfully!');
        // Additional logic after successful submission, if needed
    };
    
    return (
        <div className = "reviews-container">
            {/* content */}
            <CustomForm
                config={reviewFormConfig}
                onSubmit={handleSubmitReview}
                mode="create"
                onSubmissionSuccess={handleSubmissionSuccess}
                className="review-form"
                />
            {reviews.map((review, index) => (
                <div key={index} className="review">
                    {/* single review */}
                    <div className="review-rating">{renderRating(review.rating)}</div>
                    <div className="review-content">{review.comment}</div>
                    <div className="review-footer">
                        <span className="review-user">{review.location}</span>
                        <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            ))}
            <div ref={loader} />
            {loading && <p>Loading more reviews...</p>}
        </div>
    )
}

export default Reviews;

// Path: recipe-app/src/components/pages/Reviews.jsx