// src/components/ui/Button.jsx
import React from 'react';

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};
