import React from 'react';
import Button from '../common/Button';
import Modal from './Modal';
import './DetailsModal.scss';

const displayConfig = {
    recipe: {
        title: 'name',              // 标题字段
        image: 'imagePath',         // 图片字段
        instructions: 'instructions', // 指令字段
        ignoreFields: ['id', 'createdBy', 'createdAt'] // 忽略的字段
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
        title: 'fullName',
        image: 'imagePath',
        ignoreFields: ['id', 'firstName', 'lastName', 'password']
    }
};

const DetailsModal =  ({ isOpen, onClose, data, type, onEdit }) => {
    if(!data || !isOpen) return null;

    const config = displayConfig[type];

    const renderDetails = () => {
        return Object.entries(data).map(([key, value]) => {
            if (config.ignoreFields.includes(key)) return null;
    
            if (key === config.title) {
                return <h2 key={key}>{value}</h2>;
            }
    
            if (key === config.image) {
                return (
                    <div key={key} className="detail-item">
                    {value ? (
                        <img src={`http://localhost:8000${value}`} alt={data[config.title]} />
                    ) : (
                        <img src="http://localhost:8000/storage/recipes/1700071458_b1.jpg" alt="Default" />
                    )}
                </div>
                );
            }
    
            if (key === config.instructions) {
                return (
                    <div key={key} className="detail-item">
                        <strong>Instructions: </strong>
                        <p>{value}</p>
                    </div>
                );
            }
    
            return (
                <div key={key} className="detail-item">
                    <strong>{camelCaseToWords(key)}: </strong>
                    <span>{value}</span>
                </div>
            );
        });
    };
    return (
        <Modal isOpen = {isOpen} onClose = {onClose} className="details-modal">
            {renderDetails()}
            {onEdit && (
                <Button onClick={() => onEdit(data)} className="edit-button"variant="edit">
                    Edit
                </Button>
            )}
        </Modal>
    );
};

function camelCaseToWords(str) {
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}

export default DetailsModal;

// Path: recipe-app/src/components/modals/DetailsModal.jsx