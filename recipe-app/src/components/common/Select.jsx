import React from 'react';
import './Select.scss';

const Select = ({ name, label, options, value, onChange }) => {
    return (
        <div className="select-container">
            <label>
                {label}
                <select name = {name} value = {value} onChange = {onChange}>
                    {options.map(option => (
                        <option key = {option.value} value = {option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default Select;