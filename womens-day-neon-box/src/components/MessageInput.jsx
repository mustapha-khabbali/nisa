import React from 'react';
import { motion } from 'framer-motion';

export const MessageInput = ({ value, onChange, onSubmit, onCancel }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-panel"
            style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto',
                boxShadow: '0 0 30px rgba(174, 34, 255, 0.2), inset 0 0 20px rgba(174, 34, 255, 0.1)',
                border: '1px solid rgba(174, 34, 255, 0.3)'
            }}
        >
            <h3 style={{
                textAlign: 'center',
                margin: 0,
                fontSize: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#fff',
                textShadow: '0 0 10px rgba(174, 34, 255, 0.8)'
            }}>
                Pack a Custom Note
            </h3>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type an encouraging message for Women's Day..."
                rows={4}
                style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 20, 147, 0.5)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: '#fff',
                    fontSize: '1.1rem',
                    resize: 'none',
                    outline: 'none',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5), 0 0 10px rgba(255, 20, 147, 0.2)',
                    transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                    e.target.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.5), 0 0 15px rgba(255, 20, 147, 0.6)';
                    e.target.style.border = '1px solid rgba(255, 20, 147, 0.8)';
                }}
                onBlur={(e) => {
                    e.target.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.5), 0 0 10px rgba(255, 20, 147, 0.2)';
                    e.target.style.border = '1px solid rgba(255, 20, 147, 0.5)';
                }}
            />

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '10px' }}>
                <button
                    onClick={onCancel}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#aaa',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.9rem'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.color = '#fff';
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.color = '#aaa';
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                    }}
                >
                    Cancel
                </button>

                <button
                    onClick={onSubmit}
                    disabled={!value.trim()}
                    style={{
                        background: value.trim() ? 'linear-gradient(135deg, rgba(255, 20, 147, 0.5), rgba(174, 34, 255, 0.5))' : 'rgba(255,255,255,0.1)',
                        border: value.trim() ? '1px solid rgba(255, 20, 147, 0.8)' : '1px solid rgba(255,255,255,0.2)',
                        color: value.trim() ? '#fff' : '#666',
                        padding: '10px 30px',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: 'bold',
                        boxShadow: value.trim() ? '0 0 15px rgba(255, 20, 147, 0.4)' : 'none',
                        cursor: value.trim() ? 'pointer' : 'not-allowed'
                    }}
                >
                    Pack It
                </button>
            </div>
        </motion.div>
    );
};
