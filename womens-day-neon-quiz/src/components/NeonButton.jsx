import React from 'react';
import { motion } from 'framer-motion';

export const NeonButton = ({ onClick, children, className = '', style = {} }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`glass-panel pulsing-glow ${className}`}
            style={{
                padding: '15px 40px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#fff',
                border: '2px solid var(--neon-pink)',
                background: 'linear-gradient(135deg, rgba(255,20,147,0.2) 0%, rgba(174,34,255,0.2) 100%)',
                boxShadow: '0 0 15px rgba(255,20,147,0.5), inset 0 0 10px rgba(255,255,255,0.2)',
                borderRadius: '50px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                ...style
            }}
        >
            {children}
        </motion.button>
    );
};
