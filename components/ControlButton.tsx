import React from 'react';

interface ControlButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'start' | 'pause' | 'secondary';
}

const ControlButton: React.FC<ControlButtonProps> = ({ onClick, children, disabled = false, variant = 'secondary' }) => {
  const baseClasses = "w-20 h-20 rounded-full text-lg font-semibold focus:outline-none focus:ring-4 transition-all duration-200 ease-in-out flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    start: 'bg-cyan-400 text-slate-900 hover:bg-cyan-300 focus:ring-cyan-400/50',
    pause: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400/50',
    secondary: 'bg-slate-800 text-slate-300 hover:bg-slate-700 focus:ring-slate-600/50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default ControlButton;