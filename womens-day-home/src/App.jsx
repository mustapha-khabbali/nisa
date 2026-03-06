import React from 'react';
import './index.css';
import { AnimatedBackground } from './components/AnimatedBackground';

// Import logos
import cmcLogo from './assets/cmc.webp';
import fablabLogo from './assets/fablab.webp';
import yLogo from './assets/y.webp';

function App() {
  return (
    <div className="home-container">
      {/* Background Decor from Quiz */}
      <div className="background-blur-decor bg-decor-1"></div>
      <div className="background-blur-decor bg-decor-2"></div>

      {/* Sparkle Particles Overlay */}
      <AnimatedBackground />

      {/* Header with Logos */}
      <header className="logos-header">
        <img src={cmcLogo} alt="CMC Logo" className="logo-item" />
        <img src={yLogo} alt="Y Logo" className="logo-item" style={{ height: '90px' }} />
        <img src={fablabLogo} alt="Fablab Logo" className="logo-item" />
      </header>

      {/* Main Typography content */}
      <main className="text-content">
        <h2 className="subtitle neon-text-purple">by women for women</h2>
        <h1 className="headline neon-text-pink">Happy International 8th March</h1>
        {/* Using a cute cursive font since actual Gistsey file was not found */}
        <div className="cursive-title neon-text-pink">Women's Day</div>
      </main>

      {/* Navigation Buttons to other projects */}
      <nav className="buttons-container">
        {/* Relative Links depending on how projects are deployed together */}
        {/* Garden */}
        <a href="/Magical_Swaying_Garden-main/index.html" className="flower-button floating">
          <span className="text">Garden</span>
        </a>

        {/* Box */}
        <a href="/womens-day-neon-box/index.html" className="flower-button floating">
          <span className="text">Box</span>
        </a>

        {/* Quiz */}
        <a href="/womens-day-neon-quiz/index.html" className="flower-button floating">
          <span className="text">Quiz</span>
        </a>
      </nav>
    </div>
  );
}

export default App;
