import React, { useRef, useEffect } from 'react';

export const BackgroundSparkles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init(); // Reinitialize sparkles to adjust density if moving between breakpoints
        };

        let sparkles = [];
        const init = () => {
            sparkles = [];
            // Density Control
            const numSparkles = window.innerWidth < 600 ? 20 : 40;

            for (let i = 0; i < numSparkles; i++) {
                sparkles.push({
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    vx: (Math.random() - 0.5) * 0.2, // Between -0.1 and 0.1
                    vy: (Math.random() - 0.5) * 0.2, // Between -0.1 and 0.1
                    phase: Math.random() * Math.PI * 2, // Random starting angle
                    radius: 0.5 + Math.random() * 1.5 // Radius between 0.5 and 2.0
                });
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Will call init() initially

        const animate = (time) => {
            // Clear canvas for next frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sparkles.forEach(f => {
                // Physics and Movement
                f.x += f.vx;
                f.y += f.vy;

                // Screen Wrapping
                if (f.x < 0) f.x = canvas.width;
                if (f.x > canvas.width) f.x = 0;
                if (f.y < 0) f.y = canvas.height;
                if (f.y > canvas.height) f.y = 0;

                // Visual Rendering Logic
                // Sinusoidal Oscillation
                const drawX = f.x + Math.sin(time * 0.001 + f.phase) * 20;

                // Dynamic Opacity
                const opacity = (Math.sin(time * 0.002 + f.phase) + 1) / 2;

                ctx.beginPath();
                // Fill with light pink per request, plus a glowing effect
                ctx.fillStyle = `rgba(255, 182, 193, ${opacity})`;
                ctx.arc(drawX, f.y, f.radius, 0, Math.PI * 2);

                ctx.shadowBlur = Math.random() * 10 + 5; // Twinkling glow
                ctx.shadowColor = '#ff1493';
                ctx.fill();
                ctx.closePath();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0
            }}
        />
    );
};
