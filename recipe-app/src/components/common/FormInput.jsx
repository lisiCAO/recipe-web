import React from "react";
import "./FormInput.scss";

const FormInput = ({ name, label, type = "text", value, onChange }) => (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default FormInput;