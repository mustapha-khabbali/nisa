import React from 'react';
import { motion } from 'framer-motion';

export const NeonButton = ({ children, onClick, color = 'pink', style = {}, ...props }) => {
  const neonStyle = color === 'pink' 
    ? {
        boxShadow: "0 0 15px rgba(255, 20, 147, 0.5), 0 0 30px rgba(255, 20, 147, 0.3), inset 0 0 15px rgba(255, 20, 147, 0.2)",
        background: "linear-gradient(135deg, rgba(255, 20, 147, 0.3), rgba(255, 20, 147, 0.1))",
        border: "1px solid rgba(255, 20, 147, 0.6)"
      }
    : {
        boxShadow: "0 0 15px rgba(174, 34, 255, 0.5), 0 0 30px rgba(174, 34, 255, 0.3), inset 0 0 15px rgba(174, 34, 255, 0.2)",
        background: "linear-gradient(135deg, rgba(174, 34, 255, 0.3), rgba(174, 34, 255, 0.1))",
        border: "1px solid rgba(174, 34, 255, 0.6)"
      };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05, 
        boxShadow: color === 'pink' 
          ? "0 0 25px rgba(255, 20, 147, 0.8), 0 0 50px rgba(255, 20, 147, 0.4), inset 0 0 20px rgba(255, 20, 147, 0.3)"
          : "0 0 25px rgba(174, 34, 255, 0.8), 0 0 50px rgba(174, 34, 255, 0.4), inset 0 0 20px rgba(174, 34, 255, 0.3)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        ...neonStyle,
        padding: '16px 32px',
        borderRadius: '50px',
        color: '#fff',
        fontWeight: '800',
        fontSize: '1.2rem',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        backdropFilter: 'blur(10px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        ...style
      }}
      {...props}
    >
      <span style={{ 
        textShadow: `0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${color === 'pink' ? '#ff1493' : '#ae22ff'}`,
        position: 'relative',
        zIndex: 1
      }}>
        {children}
      </span>
    </motion.button>
  );
};
