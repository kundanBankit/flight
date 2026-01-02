// Button.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/theme.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "custom-submit-button",
}) => {
  const variants = {
    primary: "btn btn-brand",         // Filled Brand Button
    outline: "btn btn-outline-brand", // Outline Button
    
    danger: "btn btn-danger",         // Bootstrap Default
    success: "btn btn-success",       // Bootstrap Default
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variants[variant] || variants.primary} ${className}`}
      style={{ borderRadius: "25px", padding: "10px 25px", fontWeight: 600 }}
    >
      {children}
    </button>
  );
};

export default Button;
