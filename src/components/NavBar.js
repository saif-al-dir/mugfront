// NavBar.js
import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useSelector } from 'react-redux';
import { FaMugHot } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const { theme } = useContext(ThemeContext);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${theme === 'light' ? styles.lightNav : styles.darkNav}`}>
      <div className={styles.logo}>
        <FaMugHot className={styles.logoIcon} />
        <NavLink to="/" className={styles.logoLink} onClick={closeMenu}>
          MugStore
        </NavLink>
      </div>

      <button
        className={`${styles.hamburger} ${theme === 'light' ? styles.lightHamburger : styles.darkHamburger}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={`${menuOpen ? styles.barActive : styles.bar} ${theme === 'light' ? styles.lightBar : styles.darkBar}`}></span>
        <span className={`${menuOpen ? styles.barActive : styles.bar} ${theme === 'light' ? styles.lightBar : styles.darkBar}`}></span>
        <span className={`${menuOpen ? styles.barActive : styles.bar} ${theme === 'light' ? styles.lightBar : styles.darkBar}`}></span>
      </button>

     <ul
  className={`
    ${styles.navLinks}
    ${menuOpen ? styles.navActive : ''}
    ${theme === 'light' ? styles.lightMenu : styles.darkMenu}
  `}
>
  <li><ThemeToggle /></li>
  <li>
    <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>
      Home
    </NavLink>
  </li>
  <li>
    <NavLink to="/cart" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>
      Cart
      {cartItemsCount > 0 && (
        <span className={styles.cartBadge}>{cartItemsCount}</span>
      )}
    </NavLink>
  </li>
  <li>
    <NavLink to="/order" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>
      Order
    </NavLink>
  </li>
  <li>
    <NavLink to="/admin/products" className={({ isActive }) => isActive ? styles.active : ''} onClick={closeMenu}>
      Login
    </NavLink>
  </li>
</ul>

    </nav>
  );
};

export default NavBar;
