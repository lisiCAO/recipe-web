import React from 'react';
import Button from './Button';
import './FavoriteButton.scss';

const FavoriteButton = ({ isFavorited, onToggle }) => (
    <button 
        className={`favorite-button ${isFavorited ? 'favorite-button--favorited' : ''}`}
        onClick={onToggle}>
    </button>
);

export default FavoriteButton;

// Path: recipe-app/src/components/common/FavoriteButton.jsx