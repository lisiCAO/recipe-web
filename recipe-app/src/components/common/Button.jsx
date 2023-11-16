import React from 'react';
import './Button.scss'; // 假设你使用SCSS进行样式管理

const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button className={`button`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;