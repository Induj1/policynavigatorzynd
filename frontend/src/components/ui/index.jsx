import React from 'react';
import { Loader2 } from 'lucide-react';

// Beautiful Large Button Component for Rural Users
export const Button = ({ children, variant = 'primary', size = 'large', onClick, type = 'button', disabled = false, loading = false, className = '', icon }) => {
  const baseClasses = "rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3";
  
  const sizeClasses = {
    large: 'px-8 py-4 text-lg',
    medium: 'px-6 py-3 text-base',
    small: 'px-5 py-2.5 text-sm'
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white border-2 border-blue-400',
    secondary: 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white border-2 border-green-400',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white border-2 border-emerald-400',
    danger: 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white border-2 border-red-400',
    warning: 'bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white border-2 border-orange-400',
    outline: 'bg-white border-3 border-blue-500 text-blue-700 hover:bg-blue-50'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${(disabled || loading) ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''} ${className}`}
    >
      {loading && <Loader2 className="h-5 w-5 animate-spin" />}
      {icon && !loading && <span className="text-2xl">{icon}</span>}
      {children}
    </button>
  );
};

// Beautiful Card Component with Glass Effect
export const Card = ({ children, className = '', title, icon, gradient = 'blue' }) => {
  const gradientColors = {
    blue: 'from-blue-50 to-blue-100',
    green: 'from-green-50 to-green-100',
    purple: 'from-purple-50 to-purple-100',
    orange: 'from-orange-50 to-orange-100',
    pink: 'from-pink-50 to-pink-100'
  };
  
  return (
    <div className={`bg-gradient-to-br ${gradientColors[gradient]} backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 border-2 border-white ${className}`}>
      {(title || icon) && (
        <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-200">
          {icon && <span className="text-4xl">{icon}</span>}
          {title && <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  );
};

// Beautiful Large Input Component
export const Input = ({ label, icon, type = 'text', placeholder, value, onChange, required = false, className = '', error }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          {icon && <span className="text-2xl">{icon}</span>}
          {label}
          {required && <span className="text-red-500 text-xl">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 bg-white shadow-md hover:shadow-lg"
      />
      {error && <p className="mt-2 text-red-600 text-sm font-medium">{error}</p>}
    </div>
  );
};

// Beautiful Large TextArea Component
export const TextArea = ({ label, icon, placeholder, value, onChange, rows = 5, required = false, className = '', error }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          {icon && <span className="text-2xl">{icon}</span>}
          {label}
          {required && <span className="text-red-500 text-xl">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 bg-white shadow-md hover:shadow-lg resize-none"
      />
      {error && <p className="mt-2 text-red-600 text-sm font-medium">{error}</p>}
    </div>
  );
};

// Beautiful Badge Component
export const Badge = ({ children, variant = 'default', size = 'medium', icon, className = '' }) => {
  const baseClasses = "inline-flex items-center gap-2 rounded-full font-semibold shadow-md";
  
  const sizeClasses = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };
  
  const variantClasses = {
    default: 'bg-gradient-to-r from-gray-400 to-gray-600 text-white',
    success: 'bg-gradient-to-r from-green-400 to-green-600 text-white',
    warning: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900',
    danger: 'bg-gradient-to-r from-red-400 to-red-600 text-white',
    error: 'bg-gradient-to-r from-red-400 to-red-600 text-white',
    info: 'bg-gradient-to-r from-blue-400 to-blue-600 text-white',
    purple: 'bg-gradient-to-r from-purple-400 to-purple-600 text-white',
    pink: 'bg-gradient-to-r from-pink-400 to-pink-600 text-white'
  };
  
  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </span>
  );
};

// Beautiful Loading Spinner
export const Spinner = ({ size = 'large', className = '' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16'
  };
  
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
    </div>
  );
};

// Beautiful Alert Component
export const Alert = ({ children, variant = 'info', icon, title, className = '' }) => {
  const variantClasses = {
    info: 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-400 text-blue-800',
    success: 'bg-gradient-to-r from-green-50 to-green-100 border-green-400 text-green-800',
    warning: 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-400 text-yellow-800',
    danger: 'bg-gradient-to-r from-red-50 to-red-100 border-red-400 text-red-800'
  };
  
  return (
    <div className={`p-5 rounded-xl border-2 shadow-lg ${variantClasses[variant]} ${className}`}>
      <div className="flex items-start gap-4">
        {icon && <span className="text-3xl">{icon}</span>}
        <div className="flex-1">
          {title && <h4 className="text-lg font-bold mb-2">{title}</h4>}
          <div className="text-base">{children}</div>
        </div>
      </div>
    </div>
  );
};

// Beautiful Section Header
export const SectionHeader = ({ children, icon, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200 ${className}`}>
      {icon && <span className="text-4xl">{icon}</span>}
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {children}
      </h2>
    </div>
  );
};

// Beautiful List Item
export const ListItem = ({ children, icon, className = '' }) => {
  return (
    <div className={`flex items-start gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 ${className}`}>
      {icon && <span className="text-2xl mt-1">{icon}</span>}
      <div className="flex-1 text-base text-gray-700">{children}</div>
    </div>
  );
};

// Beautiful Select/Dropdown Component
export const Select = ({ label, icon, options, value, onChange, required = false, className = '', error }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
          {icon && <span className="text-2xl">{icon}</span>}
          {label}
          {required && <span className="text-red-500 text-xl">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-5 py-4 text-base border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 bg-white shadow-md hover:shadow-lg cursor-pointer"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-red-600 text-sm font-medium">{error}</p>}
    </div>
  );
};
