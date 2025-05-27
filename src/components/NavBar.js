import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <h2 className={styles.logo}>YOYOK</h2>
      <ul className={styles.navLinks}>
        <li><Link to="/" className={styles.navLink}>Home</Link></li>
        <li><Link to="/signin" className={styles.navLink}>Sign In</Link></li>
        <li><Link to="/signup" className={styles.navLink}>Sign Up</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
