import React from 'react';
import './StarRating.scss';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  let stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className="fas fa-star"></i>); // full star
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i key={i} className="fas fa-star-half-alt"></i>); // half star
    } else {
      stars.push(<i key={i} className="far fa-star"></i>); // empty star
    }
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
