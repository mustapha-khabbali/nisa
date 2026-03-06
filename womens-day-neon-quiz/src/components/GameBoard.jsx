import React from 'react';
import { motion } from 'framer-motion';
import womanBg from '../assets/woman.png';

export const GameBoard = ({ cards, onCardClick }) => {

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { scale: 0, opacity: 0 },
        show: { scale: 1, opacity: 1, transition: { type: 'spring', bounce: 0.4 } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)',
                gap: '12px',
                width: '100%',
                maxWidth: '1200px',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {cards.map((card, idx) => (
                <motion.div
                    key={card.id}
                    variants={itemVariants}
                    style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '1/1', // Perfect circle aspect ratio
                        perspective: '1000px'
                    }}
                >
                    <motion.div
                        initial={false}
                        animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            transformStyle: 'preserve-3d',
                            cursor: (!card.isFlipped || card.isSolved) ? 'pointer' : 'default',
                        }}
                        onClick={() => {
                            if (!card.isFlipped || card.isSolved) {
                                onCardClick(idx);
                            }
                        }}
                    >
                        {/* Front (Back of card before flip) */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            borderRadius: '50%',
                            backgroundImage: `url(${womanBg})`,
                            backgroundSize: 'auto 92%',
                            backgroundPosition: 'center bottom',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: 'rgba(255, 20, 147, 0.1)', // Provide body color in case image is smaller
                            border: '2px solid rgba(255,255,255,0.4)',
                            boxShadow: '0 4px 15px rgba(255,20,147,0.4)'
                        }} />

                        {/* Back (Revealed content after flip) */}
                        <div style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            borderRadius: '50%',
                            background: card.isSolved ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(5px)',
                            transform: 'rotateY(180deg)',
                            border: card.isSolved ? '2px solid #00ff00' : '2px solid #fff',
                            boxShadow: card.isSolved ? '0 0 15px #00ff00' : '0 0 20px #fff, inset 0 0 15px rgba(255,255,255,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{ fontSize: '3.5rem', textShadow: card.isSolved ? 'none' : '0 0 15px #fff' }}>
                                {card.isSolved ? '✅' : ''}
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
};
