import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperMessage } from './PaperMessage';

const BoxFace = ({ transform, bg, children, isLid = false }) => (
    <div style={{
        position: 'absolute',
        width: '140px',
        height: '140px',
        background: bg,
        border: '2px solid rgba(255,255,255,0.4)',
        boxShadow: 'inset 0 0 20px rgba(255, 20, 147, 0.5)',
        transform,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformStyle: 'preserve-3d'
    }}>
        <div style={{ position: 'absolute', width: '100%', height: '20px', background: 'rgba(255,255,255,0.8)', boxShadow: '0 0 5px rgba(255,255,255,0.5)', transform: 'translateZ(1px)' }} />
        <div style={{ position: 'absolute', height: '100%', width: '20px', background: 'rgba(255,255,255,0.8)', boxShadow: '0 0 5px rgba(255,255,255,0.5)', transform: 'translateZ(1px)' }} />

        <div style={{
            position: 'absolute',
            width: '136px', height: '136px',
            background: '#1a0224',
            transform: isLid ? 'translateZ(-1px)' : 'translateZ(-1px) rotateY(180deg)',
        }} />

        {children}
    </div>
);

export const MessageBox = ({ message, onReset }) => {
    const [stage, setStage] = useState('tumbling'); // 'tumbling' -> 'opened'
    const [tumbleParams, setTumbleParams] = useState(null);

    useEffect(() => {
        const signX = Math.random() > 0.5 ? 1 : -1;
        const signY = Math.random() > 0.5 ? 1 : -1;
        const signZ = Math.random() > 0.5 ? 1 : -1;

        const finalX = (Math.random() - 0.5) * 100;

        setTumbleParams({
            startX: signX * (150 + Math.random() * 100),
            startY: -100 - Math.random() * 50,
            startRotX: signX * (360 + Math.random() * 720),
            startRotY: signY * (360 + Math.random() * 720),
            startRotZ: signZ * (360 + Math.random() * 720),
            finalX
        });
    }, []);

    if (!tumbleParams) return null;

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px'
        }}>
            <motion.div
                initial={{
                    y: '-80vh',
                    x: tumbleParams.startX,
                    rotateX: tumbleParams.startRotX,
                    rotateY: tumbleParams.startRotY,
                    rotateZ: tumbleParams.startRotZ,
                    scale: 0.3
                }}
                animate={{
                    y: stage === 'tumbling' ? [null, 0, -100, 0, -30, 0] : 100,
                    x: tumbleParams.finalX,
                    rotateX: stage === 'tumbling' ? 0 : -15,
                    rotateY: stage === 'tumbling' ? 0 : 25,
                    rotateZ: 0,
                    scale: 1
                }}
                transition={{
                    duration: stage === 'tumbling' ? 2.0 : 0.8,
                    ease: "easeOut",
                    y: stage === 'tumbling' ? { type: "spring", damping: 12, stiffness: 100 } : { type: "spring", bounce: 0.2 }
                }}
                onAnimationComplete={() => {
                    if (stage === 'tumbling') {
                        setTimeout(() => setStage('opened'), 400);
                    }
                }}
                style={{
                    width: '140px',
                    height: '140px',
                    position: 'absolute',
                    transformStyle: 'preserve-3d',
                    zIndex: 10
                }}
            >
                <BoxFace transform="translateZ(70px)" bg="linear-gradient(135deg, #ff1493, #ae22ff)" />
                <BoxFace transform="rotateY(180deg) translateZ(70px)" bg="linear-gradient(135deg, #d40078, #860cbd)" />
                <BoxFace transform="rotateY(90deg) translateZ(70px)" bg="linear-gradient(135deg, #e60082, #9410cc)" />
                <BoxFace transform="rotateY(-90deg) translateZ(70px)" bg="linear-gradient(135deg, #ff33a1, #b538ff)" />
                <BoxFace transform="rotateX(-90deg) translateZ(70px)" bg="linear-gradient(135deg, #cc0066, #7a00a3)" />

                <div style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '140px', height: '140px',
                    transform: 'rotateX(90deg) translateZ(70px)',
                    transformStyle: 'preserve-3d',
                }}>
                    <motion.div
                        animate={{ rotateX: stage === 'opened' ? 120 : 0 }}
                        transition={{ type: 'spring', bounce: 0.4, duration: 1.2 }}
                        style={{
                            width: '100%', height: '100%',
                            transformOrigin: 'top center',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <BoxFace isLid transform="" bg="linear-gradient(135deg, #ff66b8, #c666ff)">
                            <div style={{
                                position: 'absolute',
                                width: '40px',
                                height: '40px',
                                background: '#fff',
                                borderRadius: '50%',
                                boxShadow: '0 0 15px #fff',
                                transform: 'translateZ(2px)'
                            }} />
                        </BoxFace>
                    </motion.div>
                </div>
            </motion.div>

            {/* Backdrop that fades in and blurs the box */}
            <AnimatePresence>
                {stage === 'opened' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        style={{
                            position: 'absolute',
                            top: '50%', left: '50%', marginLeft: '-150vw', marginTop: '-150vh',
                            width: '300vw', height: '300vh',
                            backdropFilter: 'blur(15px)',
                            WebkitBackdropFilter: 'blur(15px)',
                            background: 'rgba(10, 2, 18, 0.5)',
                            zIndex: 15,
                            transform: 'translateZ(100px)'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Paper Card flying out */}
            <AnimatePresence>
                {stage === 'opened' && (
                    <motion.div
                        initial={{
                            y: 100,
                            x: tumbleParams.finalX,
                            z: 0,
                            opacity: 1, // Start visible
                            scale: 0.2,
                            rotateX: 90,
                            rotateY: 0
                        }}
                        animate={{
                            y: [100, -250, -50],
                            x: [tumbleParams.finalX, 0, 0],
                            z: [0, 150, 300],
                            opacity: 1,
                            scale: [0.2, 0.8, 1.2],
                            rotateX: [90, -10, 0],
                            rotateY: [0, 10, 0]
                        }}
                        transition={{
                            duration: 2.0,
                            times: [0, 0.5, 1],
                            type: 'spring',
                            bounce: 0.4
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginLeft: '-200px', /* half width of 400px */
                            marginTop: '-140px', /* half height of 280px */
                            zIndex: 20
                        }}
                    >
                        <PaperMessage message={message} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {stage === 'opened' && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                        style={{ position: 'absolute', bottom: '40px', zIndex: 110 }}
                    >
                        <button
                            onClick={onReset}
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                                color: '#fff',
                                padding: '12px 30px',
                                borderRadius: '30px',
                                textTransform: 'uppercase',
                                fontSize: '0.9rem',
                                letterSpacing: '2px',
                                fontWeight: '800',
                                boxShadow: '0 0 15px rgba(255,255,255,0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.5)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.boxShadow = '0 0 15px rgba(255,255,255,0.2)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            Back to Home
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
