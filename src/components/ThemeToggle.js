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
        fontSize: '1.7rem',
        marginLeft: 30,
        marginTop: 5,
      }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <FaMoon style={{color: '#0034ddff'}}/>
                        : <FaSun style={{color: '#d1d801ff'}}/>}
    </button>
  );
};

export default ThemeToggle;