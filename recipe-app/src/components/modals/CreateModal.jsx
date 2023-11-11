import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import './CreateModal.scss';
import FormInput from '../common/FormInput';
import FormTextArea from '../common/FormTextArea';
import FormFileInput from '../common/FormFileInput';

const CreateModal = ({ isOpen, onClose, onCreate, config }) => {
    const [formData, setFormData] = useState(config.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
    }, {}));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        // 简单的数据验证
        for (let field of config) {
            if (!formData[field.name].trim()) {
                alert(`Please enter ${field.label}.`);
                return;
            }
        }
        onCreate(formData);
        onClose();
    };

    const renderFormFields = () => {
        return config.map((field) => {
            switch (field.type) {
                case 'text':
                    return (
                        <FormInput
                            key={field.name} 
                            {...field}
                            name={field.name}
                            label={field.label}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    );
                case 'textarea':
                    return (
                        <FormTextArea
                            key={field.name} 
                            {...field}
                            name={field.name}
                            label={field.label}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    );
                case 'file':
                    return (
                        <FormFileInput
                            key={field.name} 
                            {...field}
                            name={field.name}
                            label={field.label}
                            onChange={handleFileChange}
                        />
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleCreate} >
                {renderFormFields()}
                <Button type="submit">Create</Button>
            </form>
        </Modal>
    );
};

export default CreateModal;