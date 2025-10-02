import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.3rem',
      }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FaMoon style={{color: '#011ad8ff'}}/>
                        : <FaSun style={{color: '#d1d801ff'}}/>}
    </button>
  );
};

export default ThemeToggle;