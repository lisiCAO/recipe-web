import React from 'react';
import './FormFileInput.scss';

const FormFileInput = ({ name, label, onFileUpload }) => {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileUpload(file); // 当文件被选择时，调用 onFileUpload 函数
        }
    };
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type="file"
                name={name}
                id={name}
                onChange={handleFileChange}
            />
        </div>
    );
}

export default FormFileInput;