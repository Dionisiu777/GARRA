import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wide">
          {label}
        </label>
      )}
      <input 
        className={`w-full h-12 px-4 bg-garra-card text-white border-2 border-gray-700 rounded focus:outline-none focus:border-garra-accent focus:bg-gray-800 transition-colors text-lg ${className}`}
        {...props}
      />
    </div>
  );
};