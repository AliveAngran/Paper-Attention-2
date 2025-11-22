import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  glowing?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, title, subtitle, className = "", glowing = false }) => {
  return (
    <div className={`relative border border-gray-800 bg-cyber-panel/50 backdrop-blur-md rounded-xl p-6 overflow-hidden transition-all duration-300 ${glowing ? 'shadow-[0_0_30px_rgba(0,240,255,0.1)] border-cyber-accent/30' : 'hover:border-gray-600'} ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6 border-b border-gray-800 pb-4">
          {title && <h3 className="text-xl font-bold text-cyber-accent tracking-wide uppercase font-mono">{title}</h3>}
          {subtitle && <p className="text-cyber-dim text-sm mt-1 font-light">{subtitle}</p>}
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gray-800/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyber-accent/50" />
    </div>
  );
};