import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { useSelector } from 'react-redux';
import { FaMugHot } from 'react-icons/fa';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItemsCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <FaMugHot className={styles.logoIcon} />
        <NavLink to="/" className={styles.logoLink} onClick={closeMenu}>
          MugStore
        </NavLink>
      </div>

    <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={menuOpen ? styles.barActive : styles.bar}></span>
        <span className={menuOpen ? styles.barActive : styles.bar}></span>
        <span className={menuOpen ? styles.barActive : styles.bar}></span>

      </button>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.navActive : ''}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}
          onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => isActive ? styles.active : ''}
          onClick={closeMenu}
          >
            Cart
            {cartItemsCount > 0 && (
              <span className={styles.cartBadge}>{cartItemsCount}</span>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/order" className={({ isActive }) => isActive ? styles.active : ''}
          onClick={closeMenu}
          >
            Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? styles.active : ''}
          onClick={closeMenu}
          >
            Admin
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
