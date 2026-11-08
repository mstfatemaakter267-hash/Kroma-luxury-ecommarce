import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-12 max-w-md mx-auto ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-600 mb-5 shadow-xs">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-stone-900 mb-2 font-display">{title}</h3>
      <p className="text-sm text-stone-500 leading-relaxed mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
