import React from 'react';
import Button from './Button';
import './FavoriteButton.scss';

const FavoriteButton = ({ isFavorited, onToggle }) => (
    <Button className={`favorite-button ${isFavorited ? 'favorited' : ''}`} onClick={onToggle}>
        {isFavorited ? '♥' : '♡'}
    </Button>
);

export default FavoriteButton;

// Path: recipe-app/src/components/common/FavoriteButton.jsx