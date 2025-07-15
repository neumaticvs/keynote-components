import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-blue-600 text-white border-transparent hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white border-transparent hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white border-transparent hover:bg-red-700 focus:ring-red-500',
    outline: 'bg-transparent text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;