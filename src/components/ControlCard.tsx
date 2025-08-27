import React from 'react';

interface ControlCardProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  onDoubleClick?: () => void;
}

export const ControlCard: React.FC<ControlCardProps> = ({ 
  label, 
  children, 
  className = '',
  onDoubleClick
}) => {
  return (
    <div 
      className={`bg-[var(--theme-bg-control)] rounded-xl p-5 border border-[var(--theme-border-secondary)] hover:border-[var(--theme-border-hover)] transition-all duration-200 ${className}`}
      onDoubleClick={onDoubleClick}
    >
      <label className="text-xs text-[var(--theme-text-muted)] uppercase tracking-wider mb-4 block text-center font-medium">
        {label}
      </label>
      {children}
    </div>
  );
};