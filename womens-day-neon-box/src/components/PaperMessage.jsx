import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

export const PaperMessage = ({ message, onComplete }) => {

    useEffect(() => {
        // Trigger confetti after the paper is fully unrolled/settled
        const timer = setTimeout(() => {
            triggerConfetti();
            if (onComplete) onComplete();
        }, 1200);

        return () => clearTimeout(timer);
    }, [message, onComplete]);

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 15,
                angle: 60,
                spread: 70,
                origin: { x: 0, y: 0.6 },
                colors: ['#ff1493', '#ae22ff', '#ffffff', '#ff69b4', '#ffb6c1'],
                zIndex: 1000
            });
            confetti({
                particleCount: 15,
                angle: 120,
                spread: 70,
                origin: { x: 1, y: 0.6 },
                colors: ['#ff1493', '#ae22ff', '#ffffff', '#ff69b4', '#ffb6c1'],
                zIndex: 1000
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 50%, #f3e5f5 100%)',
                width: '400px', // Increased from 320px (~25% increase for better standard feel)
                minHeight: '280px', // Increased from 220px
                padding: '60px 40px 50px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 20, 147, 0.5)',
                border: '4px solid rgba(255, 255, 255, 0.9)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}
        >
            {/* Cute top pinned decoration (like a heart seal) */}
            <div style={{
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #ff1493, #ff69b4)',
                borderRadius: '50%',
                boxShadow: '0 5px 15px rgba(255, 20, 147, 0.6), inset 0 0 10px rgba(255,255,255,0.6)',
                border: '3px solid #fff',
                zIndex: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Heart size={30} color="#fff" fill="#fff" />
            </div>

            {/* cute corner sparkles */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', color: '#ff69b4', fontSize: '24px', opacity: 0.8 }}>✨</div>
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', color: '#ae22ff', fontSize: '24px', opacity: 0.8 }}>✨</div>

            <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '2rem',
                color: '#d81b60',
                textAlign: 'center',
                lineHeight: '1.4',
                margin: 0,
                textShadow: '0px 2px 4px rgba(255, 20, 147, 0.1)',
                position: 'relative',
                zIndex: 2,
                fontWeight: '800',
                letterSpacing: '1px',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                width: '100%'
            }}>
                "{message}"
            </p>
        </div>
    );
};
