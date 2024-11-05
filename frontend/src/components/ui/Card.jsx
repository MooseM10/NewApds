// src/components/ui/Card.jsx
import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="border-b mb-4">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-2xl font-bold text-center">{children}</h2>;
};
export const CardDescription = ({ children }) => {
  return <p className="text-gray-600">{children}</p>;
};