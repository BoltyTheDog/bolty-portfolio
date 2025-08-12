import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white shadow-md hover:shadow-lg transition rounded-2xl ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);