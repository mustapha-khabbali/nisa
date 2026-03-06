import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NeonButton } from './components/NeonButton';
import { MessageInput } from './components/MessageInput';
import { MessageBox } from './components/MessageBox';
import { BackgroundSparkles } from './components/BackgroundSparkles';
import { Gift, PenLine } from 'lucide-react';
import audioSpecial from './assets/audioSpecial.mp3';
import FloatingHomeButton from './components/FloatingHomeButton';


function App() {
  const [view, setView] = useState('home'); // 'home', 'input', 'box'
  const [message, setMessage] = useState('');

  // Audio reference initialized once
  const audioRef = useRef(new Audio(audioSpecial));

  const [customMessages, setCustomMessages] = useState(() => {
    const saved = localStorage.getItem('neonBoxMessages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const handleSurprise = () => {
    // Play audio immediately on true click
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio block:", e));
    }
    // If user deleted all default messages and hasn't packed any notes:
    if (customMessages.length === 0) {
      alert("sendo9a khawya , ketbi chi 7aja.");
      return;
    }

    let pool = [...customMessages];

    // Per request: do not pick the "last message stored" 
    // to maintain the element of surprise (only if there are > 1 messages).
    if (customMessages.length > 1) {
      const lastStored = customMessages[customMessages.length - 1];
      pool = pool.filter(msg => msg !== lastStored);
    }

    // Fallback if the pool is empty because filter removed the only choice
    if (pool.length === 0) {
      pool = [...customMessages];
    }

    const randomMsg = pool[Math.floor(Math.random() * pool.length)];
    setMessage(randomMsg);
    setView('box');
  };

  const handleCustomNote = (customMsg) => {
    if (customMsg.trim()) {
      const newCustomMessages = [...customMessages, customMsg];
      setCustomMessages(newCustomMessages);
      localStorage.setItem('neonBoxMessages', JSON.stringify(newCustomMessages));
    }
    setMessage(''); // Clear immediately so it doesn't trigger on 'Surprise Me' as a forced message
    setView('home');
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <BackgroundSparkles />

      {/* Background Decor */}
      <div style={{
        position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(255, 20, 147, 0.3) 0%, transparent 70%)', filter: 'blur(50px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(174, 34, 255, 0.3) 0%, transparent 70%)', filter: 'blur(70px)', borderRadius: '50%', zIndex: 0, pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px' }}
            >
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h1 className="neon-text-pink" style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', margin: 0, textTransform: 'none', letterSpacing: '2px', lineHeight: 1.2 }}>
                  Happy Women's Day
                </h1>
                <p style={{ color: '#fff', fontSize: '1.2rem', letterSpacing: '2px', opacity: 0.8, textTransform: 'uppercase' }}>
                  Celebrate power, grace & brilliance.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <NeonButton color="pink" onClick={handleSurprise}>
                  <Gift size={24} /> rissala lik
                </NeonButton>

                <NeonButton color="purple" onClick={() => {
                  setMessage(''); // clear previous message
                  setView('input');
                }}>
                  <PenLine size={24} /> ketbi chi 7aja
                </NeonButton>
              </div>
            </motion.div>
          )}

          {view === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%' }}
            >
              <MessageInput
                value={message}
                onChange={setMessage}
                onSubmit={() => handleCustomNote(message)}
                onCancel={() => {
                  setMessage('');
                  setView('home');
                }}
              />
            </motion.div>
          )}

          {view === 'box' && (
            <motion.div
              key="box"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <MessageBox
                key={message + Math.random()}
                message={message}
                onReset={() => {
                  setMessage('');
                  setView('home');
                }}
              />
            </motion.div>
          )}

          {view === 'custom_note' && (
            <motion.div
              key="custom_note"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
            >
              {/* Blurred Bacgkround */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  background: 'rgba(10, 2, 18, 0.5)',
                  zIndex: 1
                }}
              />

              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', bounce: 0.4, duration: 1.0 }}
                style={{ zIndex: 2 }}
              >
                <PaperMessage message={message} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                style={{ position: 'absolute', bottom: '40px', zIndex: 110 }}
              >
                <button
                  onClick={() => {
                    setMessage('');
                    setView('home');
                  }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <FloatingHomeButton />
    </div>
  );
}

export default App;
