import React, { useState, useEffect, useMemo, useContext } from 'react';
import Modal from './Modal';
import Button from '../common/Button';
import FormInput from '../common/FormInput';
import FormTextArea from '../common/FormTextArea';
import FormFileInput from '../common/FormFileInput';
import Select from '../common/Select';
import ApiService from '../../services/ApiService';
import { MessageContext } from '../common/MessageContext';
import Message from '../common/Message';
import './FormModal.scss';

const FormModal = ({ isOpen, onClose, onSubmit, config, initialData, mode }) => {
    const shouldShowPasswordCheckbox = useMemo(() => {
        return mode === 'edit' && config.some(field => field.type === 'password');
    }, [config, mode]);

    // Initialize formData with default values
    const defaultFormData = useMemo(() => {
        return config.reduce((acc, field) => {
            acc[field.name] = '';
            return acc;
        }, {});
    }, [config]);

    const [formData, setFormData] = useState(defaultFormData);
    const [isPasswordChanging, setIsPasswordChanging] = useState(mode === 'create');
    const { message } =useContext(MessageContext);
    const { showMessage, hideMessage } = useContext(MessageContext);


    // Set formData to initialData when in edit mode
    useEffect(() => {
        if (mode === 'edit' && initialData) {
            const newFormData = { ...defaultFormData };
            config.forEach(field => {
                newFormData[field.name] = initialData[field.mapTo || field.name] || '';
            });
            setFormData(newFormData);
        } else {
            setFormData(defaultFormData);
        }
    }, [config, defaultFormData, initialData, mode]);

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFileUpload = async (file,fieldName) => {
        const formData = new FormData();
        formData.append('file', file);
        try{
            const response = await ApiService.uploadFile(formData);
            if(response){
                console.log('File upload response:', response);
                setFormData(prevFormData => ({
                    ...prevFormData,
                    [fieldName]: response
                }));
            } else {
                console.error('File upload response does not contain a URL.');
            }
        } catch (error) {
            console.error('File upload error:', error);
        }
        };

    const renderFormFields = (config) => {
        return config.map((field) => {
            if (field.name && field.name.includes('id')) {
                return null;
            }

            if (field.name && field.name.includes('createdAt')) {
                return null;
            }

            if( field.type === 'password'){
                if( mode === 'edit' && !isPasswordChanging){
                    return null;
                }
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
            }

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
                case 'number':
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
                            onFileUpload={(file) => handleFileUpload(file, field.name)}
                        />
                    );

                case 'email':
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
                case 'select':
                    return (
                        <Select
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        options={field.options}
                        value={formData[field.name]}
                        onChange={handleChange}
                        />
                    );
                default:
                    return null;
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let submittedFormData = formData;
        if (mode === 'edit' && !isPasswordChanging) {
            const { password, ...rest } = formData;
            submittedFormData = rest;
        }
        const jsonFormData = JSON.stringify(submittedFormData);
        try {
            await onSubmit(jsonFormData);
            console.log('Form submitted successfully' + message.type);
            if(message){
                setTimeout(() => {
                    console.log('Timer' + message.type);
                    onClose();
                }, 3000);
            } else {
                onClose();
            }
        } catch (error) {
            showMessage('error', error.message || 'Error occurred');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={ handleSubmit}>
                { shouldShowPasswordCheckbox && (
                    <label>
                        Change Password:
                        <input
                            type="checkbox"
                            checked={isPasswordChanging}
                            onChange={() => setIsPasswordChanging(!isPasswordChanging)}
                        />
                    </label>
                )}
                {renderFormFields(config)}
                <Message message = {message} />
                <Button type="submit">{mode === 'edit' ? 'Save Changes' : 'Create'}</Button>
            </form>
        </Modal>
    );
};

export default FormModal;
