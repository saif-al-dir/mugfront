import React from 'react';
import styles from './Footer.module.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
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