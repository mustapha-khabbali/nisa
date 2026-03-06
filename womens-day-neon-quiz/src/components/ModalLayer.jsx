import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonButton } from './NeonButton';

const ARABIC_ALPHABET = "ابتثجحخدذرزسشصضطظعغفقكلمنهويأإآؤئطة";

export const ModalLayer = ({
    type, // 'question', 'feed', 'victory', null
    data, // Question object, or special card object
    onAnswer,
    onClose,
    hints,
    onUseHint
}) => {
    const [timeSpent, setTimeSpent] = useState(0);

    // Crossword State
    const [targetWord, setTargetWord] = useState('');
    const [keyboard, setKeyboard] = useState([]);
    const [userSlots, setUserSlots] = useState([]);
    const [hasScored, setHasScored] = useState(false);

    useEffect(() => {
        if ((type === 'question' || type === 'view_question') && data && data.answer) {
            // Initialize Crossword Board
            const pureAnswer = data.answer.replace(/\s+/g, '');
            setTargetWord(pureAnswer);

            if (type === 'view_question') {
                const slots = pureAnswer.split('').map(char => ({ char, kbIndex: -1 }));
                setUserSlots(slots);
                setKeyboard([]);
                return;
            }

            const slots = new Array(pureAnswer.length).fill(null);
            setUserSlots(slots);
            setHasScored(false);

            // Generate Keyboard
            // Needs to be at least 14 keys, or length + 4, whichever is bigger
            const kbSize = Math.max(14, pureAnswer.length + 4);
            const kbLetters = pureAnswer.split('');

            // Fill the rest of the keyboard with random arabic letters
            while (kbLetters.length < kbSize) {
                const randomChar = ARABIC_ALPHABET[Math.floor(Math.random() * ARABIC_ALPHABET.length)];
                kbLetters.push(randomChar);
            }

            // Shuffle the keyboard
            kbLetters.sort(() => 0.5 - Math.random());

            const kbState = kbLetters.map((char, index) => ({
                id: index,
                char: char,
                used: false
            }));
            setKeyboard(kbState);

            const timer = setInterval(() => {
                setTimeSpent(prev => prev + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [type, data]);

    // Check Win Condition when userSlots change
    useEffect(() => {
        if (type === 'question' && targetWord && !hasScored) {
            if (userSlots.every(s => s !== null)) {
                const currentAttempt = userSlots.map(s => s.char).join('');
                if (currentAttempt === targetWord) {
                    // Correct! Calculate points with hidden speed bonus
                    setHasScored(true);
                    let points = 0;
                    if (data.diff === 'xtra') {
                        let timeBonus = timeSpent <= 60 ? 1 : 0;
                        points = 3 + timeBonus;
                    } else if (data.diff === 'hard') {
                        let timeBonus = timeSpent <= 60 ? 1 : 0;
                        points = 2 + timeBonus;
                    } else {
                        // easy
                        let timeBonus = timeSpent <= 30 ? 1 : 0;
                        points = 1 + timeBonus;
                    }
                    onAnswer(points);
                }
            }
        }
    }, [userSlots, targetWord, onAnswer, type, data, timeSpent]);


    const handleKeyboardClick = (kbIndex) => {
        if (keyboard[kbIndex].used) return;

        const emptySlotIndex = userSlots.findIndex(s => s === null);
        if (emptySlotIndex !== -1) {
            const newSlots = [...userSlots];
            newSlots[emptySlotIndex] = { char: keyboard[kbIndex].char, kbIndex };
            setUserSlots(newSlots);

            const newKb = [...keyboard];
            newKb[kbIndex].used = true;
            setKeyboard(newKb);
        }
    };

    const handleSlotClick = (slotIndex) => {
        if (!userSlots[slotIndex]) return;
        const kbIndex = userSlots[slotIndex].kbIndex;

        const newSlots = [...userSlots];
        newSlots[slotIndex] = null;
        setUserSlots(newSlots);

        const newKb = [...keyboard];
        newKb[kbIndex].used = false;
        setKeyboard(newKb);
    };

    if (!type) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', inset: 0,
                    background: 'rgba(0,0,0,0.85)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 100,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px'
                }}
                onClick={onClose}
            >
                <div
                    className="glass-panel"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        padding: '30px',
                        width: '100%',
                        maxWidth: type === 'question' ? '800px' : '500px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        textAlign: 'center',
                        border: '2px solid rgba(255,20,147,0.5)',
                        boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 0 30px rgba(255,20,147,0.2)',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        position: 'relative' // For the back button
                    }}
                >
                    {(type === 'question' || type === 'view_question') && data && (
                        <>
                            {/* Back Button */}
                            <button
                                onClick={onClose}
                                style={{
                                    position: 'absolute', top: '15px', left: '15px',
                                    background: 'rgba(255, 20, 147, 0.15)', border: '2px solid var(--neon-pink)',
                                    color: '#fff', fontSize: '1.1rem', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '8px 16px', borderRadius: '12px',
                                    boxShadow: '0 0 10px rgba(255,20,147,0.4)',
                                    fontWeight: 'bold', transition: 'all 0.2s ease',
                                    backdropFilter: 'blur(4px)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'var(--neon-pink)';
                                    e.target.style.boxShadow = '0 0 20px var(--neon-pink)';
                                    e.target.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(255, 20, 147, 0.15)';
                                    e.target.style.boxShadow = '0 0 10px rgba(255,20,147,0.4)';
                                    e.target.style.color = '#fff';
                                }}
                            >
                                <span>🔙</span> رجوع
                            </button>

                            <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', marginTop: '30px', lineHeight: '1.4' }}>{data.q}</h2>
                            <div style={{ color: '#888', marginBottom: '20px', fontSize: '0.9rem' }}>
                                {data.diff === 'xtra' ? 'صعب جداً (النقاط: 3)' :
                                    data.diff === 'hard' ? 'صعب (النقاط: 2)' :
                                        'سهل (النقاط: 1)'}
                            </div>

                            {/* Hint Button */}
                            {type === 'question' && (
                                <button
                                    onClick={() => {
                                        if (hints > 0) {
                                            const wrongIndex = userSlots.findIndex((s, i) => s === null || s.char !== targetWord[i]);
                                            if (wrongIndex !== -1) {
                                                const charNeeded = targetWord[wrongIndex];
                                                const targetKbIndex = keyboard.findIndex(k => k.char === charNeeded && !k.used);
                                                if (targetKbIndex !== -1) {
                                                    const newSlots = [...userSlots];
                                                    const newKb = [...keyboard];

                                                    // If there's an incorrect letter in this slot, return it to the keyboard
                                                    if (newSlots[wrongIndex] !== null) {
                                                        const oldKbIndex = newSlots[wrongIndex].kbIndex;
                                                        newKb[oldKbIndex].used = false;
                                                    }

                                                    newSlots[wrongIndex] = { char: charNeeded, kbIndex: targetKbIndex };
                                                    setUserSlots(newSlots);

                                                    newKb[targetKbIndex].used = true;
                                                    setKeyboard(newKb);

                                                    onUseHint();
                                                }
                                            }
                                        }
                                    }}
                                    disabled={hints <= 0}
                                    style={{
                                        marginTop: '5px', marginBottom: '25px',
                                        background: hints > 0 ? 'rgba(0, 255, 200, 0.15)' : 'rgba(255,255,255,0.05)',
                                        border: hints > 0 ? '1px solid #00ffcc' : '1px solid rgba(255,255,255,0.2)',
                                        color: hints > 0 ? '#fff' : '#888',
                                        padding: '8px 16px', borderRadius: '12px',
                                        cursor: hints > 0 ? 'pointer' : 'default',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        boxShadow: hints > 0 ? '0 0 10px rgba(0,255,204,0.4)' : 'none',
                                        transition: 'all 0.2s ease',
                                        fontWeight: 'bold', fontSize: '1.1rem'
                                    }}
                                >
                                    💡 مساعدة ({hints})
                                </button>
                            )}

                            {/* Input Slots */}
                            <div style={{
                                display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center',
                                marginBottom: '30px', width: '100%', direction: 'rtl'
                            }}>
                                {userSlots.map((slot, index) => {
                                    const isCorrect = slot && slot.char === targetWord[index] && type === 'question';
                                    const isViewMode = type === 'view_question';
                                    return (
                                        <motion.div
                                            key={`slot-${index}`}
                                            initial={false}
                                            animate={{
                                                scale: slot ? [1.2, 1] : 1,
                                                boxShadow: isCorrect ? ['0 0 30px #fff', '0 0 15px #00ffcc'] : 'none'
                                            }}
                                            transition={{ duration: 0.3 }}
                                            whileHover={(slot && type === 'question') ? { scale: 1.1 } : {}}
                                            onClick={() => {
                                                if (type === 'question') handleSlotClick(index);
                                            }}
                                            style={{
                                                width: '50px', height: '60px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '2rem', fontWeight: 'bold',
                                                background: isCorrect ? 'rgba(0, 255, 200, 0.2)' : (isViewMode ? 'rgba(255,255,255,0.15)' : (slot ? 'rgba(255,255,255,0.1)' : 'transparent')),
                                                border: isCorrect ? '2px solid #00ffcc' : (isViewMode ? '2px solid rgba(255,255,255,0.8)' : (slot ? '2px solid rgba(255,255,255,0.5)' : '2px solid rgba(255,255,255,0.2)')),
                                                borderRadius: '8px',
                                                cursor: (slot && type === 'question') ? 'pointer' : 'default',
                                                color: '#fff',
                                                boxShadow: isCorrect ? '0 0 15px #00ffcc' : (isViewMode ? '0 0 15px rgba(255,255,255,0.3)' : 'none'),
                                                textShadow: isCorrect ? '0 0 10px #00ffcc' : (isViewMode ? '0 0 10px rgba(255,255,255,0.5)' : 'none')
                                            }}
                                        >
                                            {slot ? slot.char : ''}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Keyboard */}
                            {type === 'question' && (
                                <div style={{
                                    display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center',
                                    maxWidth: '600px', direction: 'rtl'
                                }}>
                                    {keyboard.map((key) => (
                                        <motion.button
                                            key={`key-${key.id}`}
                                            whileHover={!key.used ? { scale: 1.1 } : {}}
                                            whileTap={!key.used ? { scale: 0.9 } : {}}
                                            onClick={() => handleKeyboardClick(key.id)}
                                            style={{
                                                width: '55px', height: '65px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '1.8rem', fontWeight: 'bold',
                                                borderRadius: '12px',
                                                background: key.used ? 'rgba(0,0,0,0.5)' : 'rgba(255, 20, 147, 0.2)',
                                                border: key.used ? '1px solid #333' : '2px solid var(--neon-pink)',
                                                color: key.used ? '#555' : '#fff',
                                                cursor: key.used ? 'default' : 'pointer',
                                                pointerEvents: key.used ? 'none' : 'auto',
                                                boxShadow: key.used ? 'none' : '0 4px 10px rgba(0,0,0,0.5)'
                                            }}
                                        >
                                            {key.char}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {type === 'feed' && data && (
                        <>
                            <div style={{ fontSize: '6rem', marginBottom: '20px' }}>
                                {data.emoji}
                            </div>
                            <h2 style={{ fontSize: '2.5rem', color: data.color || 'white', textShadow: `0 0 15px ${data.color || 'white'}`, marginBottom: '10px' }}>
                                {data.title}
                            </h2>
                            <h3 style={{ fontSize: '1.5rem', opacity: 0.9, marginBottom: '40px' }}>
                                {data.desc}
                            </h3>
                            <NeonButton onClick={onClose}>متابعة</NeonButton>
                        </>
                    )}

                    {type === 'gameover' && (
                        <>
                            <div style={{ fontSize: '6rem', marginBottom: '20px' }}>🚩</div>
                            <h2 style={{ fontSize: '3rem', color: '#ff4444', textShadow: '0 0 20px #ff4444', marginBottom: '20px' }}>
                                نهاية اللعبة
                            </h2>
                            <NeonButton onClick={onClose} style={{ marginTop: '30px' }}>إعادة اللعب</NeonButton>
                        </>
                    )}

                    {type === 'victory' && (
                        <>
                            <div style={{ fontSize: '6rem', marginBottom: '20px' }}>🏆</div>
                            <h2 style={{ fontSize: '3rem', color: '#ffd700', textShadow: '0 0 20px #ffd700', marginBottom: '20px' }}>
                                تهانينا!
                            </h2>
                            <h3 style={{ fontSize: '1.5rem', opacity: 0.9, marginBottom: '40px' }}>
                                لقد أكملت اللوحة العظيمة!
                            </h3>
                            <NeonButton onClick={onClose}>العودة للرئيسية</NeonButton>
                        </>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
