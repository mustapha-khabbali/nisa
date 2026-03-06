import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NeonButton } from './NeonButton';
import { Play } from 'lucide-react';

export const Home = ({ onStartGame }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const records = JSON.parse(localStorage.getItem('m_scores_2025_women') || '[]');
        setLeaderboard(records);
    }, []);

    const handlePlay = () => {
        if (!name.trim()) {
            setError(true);
            return;
        }
        setError(false);
        onStartGame(name.trim());
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', width: '100vw', height: '100vh', alignItems: 'stretch' }}
        >
            {/* Leaderboard Sidebar */}
            <div className="glass-panel" style={{
                width: '320px',
                height: '100%',
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                borderRight: '2px solid var(--neon-purple)',
                borderRadius: '0', // remove glass panel rounding to sit flush against the edge
                borderTop: 'none',
                borderBottom: 'none',
                borderLeft: 'none',
                zIndex: 10
            }}>
                <h2 className="neon-text-purple" style={{ textAlign: 'center', marginBottom: '20px' }}>أفضل النتائج</h2>
                <ul style={{ listStyle: 'none', padding: 0, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {leaderboard.length === 0 ? (
                        <p style={{ textAlign: 'center', opacity: 0.6 }}>لا توجد نتائج بعد</p>
                    ) : (
                        leaderboard.map((record, idx) => (
                            <li key={idx} className="glass-panel" style={{
                                padding: '15px 20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'rgba(255, 20, 147, 0.1)',
                                borderRadius: '12px'
                            }}>
                                <span className="english-number" style={{ fontWeight: 'bold', color: 'var(--neon-pink)', fontSize: '1.2rem' }}>{record.score}</span>
                                <span style={{ fontWeight: 'bold' }}>{record.name}</span>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            {/* Main Center Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <h1 className="neon-text-pink" style={{ fontSize: '4.5rem', marginBottom: '10px', lineHeight: '1.2' }}>
                    النساء كويز                 </h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '40px', opacity: 0.9 }}>
                    اختبر معلوماتك وتعرّف على إنجازات النساء الرائدات
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <input
                        type="text"
                        placeholder="أدخل اسمك للبدء..."
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(false); }}
                        style={{
                            padding: '15px 25px',
                            fontSize: '1.2rem',
                            borderRadius: '15px',
                            border: `2px solid ${error ? 'red' : 'var(--neon-purple)'}`,
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            textAlign: 'center',
                            width: '300px',
                            outline: 'none',
                            boxShadow: error ? '0 0 10px red' : '0 0 15px rgba(174,34,255,0.3)',
                            fontFamily: 'inherit'
                        }}
                    />
                    {error && <span style={{ color: '#ff4444', fontWeight: 'bold' }}>يرجى إدخال اسمك أولاً!</span>}

                    <NeonButton onClick={handlePlay} style={{ marginTop: '20px', padding: '15px 60px' }}>
                        ابدأ اللعب <Play size={24} fill="currentColor" />
                    </NeonButton>
                </div>
            </div>
        </motion.div>
    );
};
