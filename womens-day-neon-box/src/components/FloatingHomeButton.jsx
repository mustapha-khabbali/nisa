import React from 'react';

export default function FloatingHomeButton() {
    return (
        <a
            href="/"
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                backgroundColor: '#ff1493', // Primary pink
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', // Asymmetric flower petal shape
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none', // Remove underline
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                boxShadow: '0 4px 15px rgba(255, 20, 147, 0.4)',
                zIndex: 9999, // Ensure it's always on top
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
                e.currentTarget.style.backgroundColor = '#ff69b4'; // Lighter pink on hover
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.backgroundColor = '#ff1493';
            }}
        >
            Home
        </a>
    );
}
