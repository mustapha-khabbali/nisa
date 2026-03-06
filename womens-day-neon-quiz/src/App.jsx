import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Home } from './components/Home';
import { HUD } from './components/HUD';
import { GameBoard } from './components/GameBoard';
import { ModalLayer } from './components/ModalLayer';
import { AnimatedBackground } from './components/AnimatedBackground';
import { womensDayQuestions } from './data/questions';
import audioCorrectFile from './assets/audioCorrect.mp3';
import audioWrongFile from './assets/audioWrong.mp3';
import audioSpecialFile from './assets/audioSpecial.mp3';
import FloatingHomeButton from './components/FloatingHomeButton';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('home'); // 'home', 'playing', 'gameover', 'victory'
  const [playerName, setPlayerName] = useState('');

  // Audio Refs
  const audioCorrectRef = React.useRef(typeof Audio !== "undefined" ? new Audio(audioCorrectFile) : null);
  const audioWrongRef = React.useRef(typeof Audio !== "undefined" ? new Audio(audioWrongFile) : null);
  const audioSpecialRef = React.useRef(typeof Audio !== "undefined" ? new Audio(audioSpecialFile) : null);

  // Game Stats
  const [score, setScore] = useState(0);
  const [usedHints, setUsedHints] = useState(0);
  const availableHints = 5 + Math.floor(score / 3) - usedHints;

  // Board & Current Focus
  const [cards, setCards] = useState([]);
  const [activeModal, setActiveModal] = useState({ type: null, data: null }); // type: 'question', 'feed', etc.

  // Initialize Game Board
  const startGame = (name) => {
    setPlayerName(name);
    setScore(0);
    setUsedHints(0);

    // Generate 27 cards from 100 pool
    let qsPool = [...womensDayQuestions].sort(() => 0.5 - Math.random());
    let deckQs = qsPool.slice(0, 27);

    let deck = deckQs.map((q, i) => ({
      type: 'trivia',
      data: q,
      isFlipped: false,
      isSolved: false,
      id: i
    }));

    setCards(deck);
    setGameState('playing');
  };

  const handleCardClick = (idx) => {
    const newCards = [...cards];
    const card = newCards[idx];

    if (card.isSolved) {
      setActiveModal({ type: 'view_question', data: card.data, cardIdx: idx });
      return;
    }

    if (!card.isFlipped) {
      newCards[idx] = { ...newCards[idx], isFlipped: true };
      setCards(newCards);

      setTimeout(() => {
        setActiveModal({ type: 'question', data: card.data, cardIdx: idx });
      }, 400); // Wait for flip animation
    }
  };

  const handleAnswer = (points) => {
    const idx = activeModal.cardIdx;

    if (points > 0) {
      if (audioCorrectRef.current) {
        audioCorrectRef.current.currentTime = 0;
        audioCorrectRef.current.play().catch(e => console.log(e));
      }
      setScore(s => s + points);

      const newCards = [...cards];
      newCards[idx] = { ...newCards[idx], isSolved: true };
      setCards(newCards);

      // Delay closing so the user can see their beautifully completed neon word
      setTimeout(() => {
        setActiveModal({ type: null, data: null });
        setTimeout(checkWinCondition, 500);
      }, 1500);
    }
  };

  const checkWinCondition = () => {
    const unresolved = cards.filter(c => !c.isSolved).length;
    if (unresolved === 0 && gameState === 'playing' && activeModal.type === null) {
      setActiveModal({ type: 'victory', data: null });
    }
  };

  const closeModal = () => {
    const prevType = activeModal.type;
    const cardIdx = activeModal.cardIdx;

    // If we are closing a question modal without solving it, unflip the card
    if (prevType === 'question' && cardIdx !== undefined) {
      const newCards = [...cards];
      if (!newCards[cardIdx].isSolved) {
        newCards[cardIdx] = { ...newCards[cardIdx], isFlipped: false };
        setCards(newCards);
      }
    }

    setActiveModal({ type: null, data: null });

    if (prevType === 'gameover' || prevType === 'victory') {
      endGame();
    } else {
      setTimeout(checkWinCondition, 500);
    }
  };

  const endGame = () => {
    // Save score
    if (playerName) {
      let records = JSON.parse(localStorage.getItem('m_scores_2025_women') || '[]');
      let existing = records.find(r => r.name === playerName);
      if (existing) {
        if (score > existing.score) existing.score = score;
      } else {
        records.push({ name: playerName, score: score });
      }
      records.sort((a, b) => b.score - a.score);
      localStorage.setItem('m_scores_2025_women', JSON.stringify(records.slice(0, 10)));
    }
    setGameState('home');
  };

  return (
    <div className="app-container">
      {/* Background Decor */}
      <div className="background-blur-decor bg-decor-1" />
      <div className="background-blur-decor bg-decor-2" />

      {/* Sparkle/Flower Particles Overlay */}
      <AnimatedBackground />

      <div className="content-layer">
        <AnimatePresence mode="wait">
          {gameState === 'home' && (
            <Home key="home" onStartGame={startGame} />
          )}

          {gameState === 'playing' && (
            <div key="game" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center' }}>
              <HUD score={score} hints={availableHints} onHome={endGame} />
              <GameBoard cards={cards} onCardClick={handleCardClick} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Popups */}
      <ModalLayer
        type={activeModal.type}
        data={activeModal.data}
        onAnswer={handleAnswer}
        onClose={closeModal}
        hints={availableHints}
        onUseHint={() => setUsedHints(h => h + 1)}
      />
      <FloatingHomeButton />
    </div>
  );
}

export default App;
