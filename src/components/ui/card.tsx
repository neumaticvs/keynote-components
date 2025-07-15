import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const classes = `bg-white rounded-lg border border-gray-200 shadow-sm ${className}`.trim();
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  const classes = `px-6 py-4 border-b border-gray-200 ${className}`.trim();
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  const classes = `px-6 py-4 ${className}`.trim();
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  const classes = `text-lg font-semibold text-gray-900 ${className}`.trim();
  
  return (
    <h3 className={classes}>
      {children}
    </h3>
  );
};

export { Card, CardHeader, CardContent, CardTitle };