import React from 'react';
import './Button.scss'; // 假设你使用SCSS进行样式管理

const Button = ({ children, onClick, className, disabled = false }) => {
  const buttonClass = `button ${className || ''}`.trim();
  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;