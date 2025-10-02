// Footer.js
import React, { useContext } from 'react';
import styles from './Footer.module.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`${styles.footer} ${theme === 'light' ? styles.lightFooter : styles.darkFooter}`}>
      <div className={styles.socials}>
        <div className={styles.span}>
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
        </div>
        <p>© {new Date().getFullYear()} MugStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
