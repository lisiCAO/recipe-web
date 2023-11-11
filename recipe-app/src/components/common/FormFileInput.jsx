import React from 'react';
import './FormFileInput.scss';

const FormFileInput = ({ name, label, onchange }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type="file"
                name={name}
                id={name}
                onChange={onchange}
            />
        </div>
    );
}

export default FormFileInput;