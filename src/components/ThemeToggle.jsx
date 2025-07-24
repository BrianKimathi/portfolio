import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => (
  <button className="theme-toggle" onClick={toggleTheme}>
    {theme === 'dark' ? '🌙' : '☀️'}
  </button>
);

export default ThemeToggle; 