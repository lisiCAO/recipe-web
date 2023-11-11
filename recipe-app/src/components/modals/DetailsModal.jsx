import React from 'react';
import Modal from '../common/Modal';
import './DetailsModal.scss';

const displayConfig = {
    recipe: {
        title: 'recipe_name',
        image: 'recipe_image_path',
        description: 'ingredient_description',
        instructions: 'step_instruction',
        ignoreFields: ['recipe_id', 'user_id']
    },
    ingredient: {
        title: 'ingredient_name',
        image: 'ingredient_image_path',
        ignoreFields: ['ingredient_id']
    },
    review: {
        title: 'review_title',
        image: 'review_image_path',
        ignoreFields: ['review_id', 'recipe_id', 'user_id']
    },
    user: { 
        title: 'user_name',
        image: 'user_image_path',
        ignoreFields: ['user_id']
    }
};

const DetailsModal =  ({ isOpen, onClose, data, type}) => {
    if(!data || !isOpen) return null;

    const config = displayConfig[type];

    const renderDetails = () => {
        return Object.entries(data).map(([key, value]) => {
            if(config.ignoreFields.includes(key)) return null;

            if(key === config.title) {
                return (
                    <h2 key = {key}>{value}</h2>
                )
            }

            if(key === config.image) {
                return (
                    <div key = {key} className = "detail-item">
                        <strong>{key.replace(/_/g, ' ')}: </strong>
                        <img src = {value} alt = {data[config.image]} />
                    </div>
                )
            }

            return (
                <div key = {key} className = "detail-item">
                    <strong>{key.replace(/_/g, ' ')}: </strong>
                    <span>{value}</span>
                </div>
            );
        });
    };
    return (
        <Modal isOpen = {isOpen} onClose = {onClose}>
            {renderDetails()}
        </Modal>
    );
};

export default DetailsModal;