import React from 'react';

// FIX: Update props to extend standard HTML attributes for a div, allowing props like `onClick`.
interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({ children, className = '', ...rest }) => {
    return (
        <div
            {...rest}
            className={`bg-gray-500/10 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-white/20 hover:shadow-xl ${className}`}
        >
            {children}
        </div>
    );
};

export default GlassmorphicCard;
