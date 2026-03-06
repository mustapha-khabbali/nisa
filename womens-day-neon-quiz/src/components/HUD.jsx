import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const HUD = ({ score, hints, onHome }) => {
    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel"
            style={{
                width: '100%',
                height: 'var(--hud-height)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 40px',
                borderBottom: '2px solid rgba(255, 20, 147, 0.4)',
                borderRadius: '0 0 24px 24px',
                marginBottom: '20px',
                zIndex: 20
            }}
        >
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {/* Home / Heart Button */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <motion.button
                        onClick={onHome}
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            background: 'rgba(255, 20, 147, 0.1)',
                            border: '2px solid var(--neon-pink)',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            width: '45px',
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            outline: 'none',
                            boxShadow: '0 0 10px rgba(255, 20, 147, 0.4), inset 0 0 5px rgba(255, 20, 147, 0.2)',
                        }}
                        title="العودة للرئيسية"
                    >
                        <Heart fill="var(--neon-pink)" color="var(--neon-pink)" size={22} style={{ filter: 'drop-shadow(0 0 5px var(--neon-pink))' }} />
                    </motion.button>
                    <span style={{ color: 'var(--neon-pink)', fontSize: '0.9rem', fontWeight: 'bold', textShadow: '0 0 5px var(--neon-pink)' }}>Home</span>
                </div>

                {/* Hint Box */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        background: 'rgba(255, 20, 147, 0.2)',
                        border: '1px solid var(--neon-pink)',
                        borderRadius: '12px',
                        padding: '5px 15px',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 0 10px rgba(255, 20, 147, 0.4)'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>💡</span>
                        <span className="english-number" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{hints}</span>
                    </div>
                </div>
            </div>

            {/* Score Box */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span className="neon-text-pink english-number" style={{ fontSize: '3.5rem', fontWeight: '800' }}>
                    {score}
                </span>
                <span style={{ fontSize: '1.2rem', opacity: 0.8 }}>النقاط</span>
            </div>
        </motion.div>
    );
};
