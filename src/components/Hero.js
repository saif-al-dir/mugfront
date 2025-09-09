import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const images = [
  '/hero-bg1.jpg',
  '/hero-bg2.jpg',
  '/hero-bg3.jpg',
  '/hero-bg4.jpg',
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      <div className={styles.content}>
        <h1>Welcome to MugStore</h1>
        <p>Your favorite place for unique mugs and gifts.</p>
      </div>
    </section>
  );
};

export default Hero;