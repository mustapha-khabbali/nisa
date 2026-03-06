import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
    // Generate random particles (small sparks only)
    const particles = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => {
            const size = Math.random() * 4 + 3; // Sparks 3-7px

            return {
                id: i,
                type: 'spark',
                size: size,
                x: Math.random() * 100, // percentage string
                y: Math.random() * 100, // percentage string
                duration: Math.random() * 15 + 10, // 10-25s animation
                delay: Math.random() * 15,
                scale: Math.random() * 0.5 + 0.5
            };
        });
    }, []);

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 1 // Above the deep blur orbs, below the UI (zIndex: 10)
        }}>
            {particles.map(p => {
                const content = <div style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 0 5px #fff, 0 0 15px var(--neon-pink), 0 0 30px var(--neon-pink)'
                }} />;

                return (
                    <motion.div
                        key={p.id}
                        initial={{
                            x: `${p.x}vw`,
                            y: '110vh', // Start exactly below screen
                            rotate: 0,
                            opacity: 0,
                            scale: p.scale
                        }}
                        animate={{
                            x: [`${p.x}vw`, `${p.x + (Math.random() * 20 - 10)}vw`, `${p.x}vw`], // sway left/right
                            y: '-20vh', // Float up past the top
                            rotate: 360,
                            opacity: [0, 0.8, 1, 0.8, 0] // Fade in and out at top
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "linear"
                        }}
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {content}
                    </motion.div>
                );
            })}
        </div>
    );
};
