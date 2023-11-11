import React from 'react';
import './FormTextArea.scss';

const FormTextArea = ({ name, label, value, onChange}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <textarea
                name={name}
                id={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default FormTextArea;