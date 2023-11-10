import React from 'react';
import './Button.scss'; // 假设你使用SCSS进行样式管理

const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
  return (
    <button className={`button ${variant}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;