import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import logo from "../assets/logo.png";

function NavBar() {
    // This component renders the navigation bar with links to Home, Sign In, and Sign Up pages.
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-left">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className={({ isActive }) =>
                `${styles.NavLink} ${isActive ? styles.Active : ""}`
              }
            >
              <i className="fas fa-home" aria-hidden="true"></i>Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/signin"
              className={({ isActive }) =>
                `${styles.NavLink} ${isActive ? styles.Active : ""}`
              } 
            >
              <i className="fas fa-sign-in-alt" aria-hidden="true"></i>sign in
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/signup"
              className={({ isActive }) =>
                `${styles.NavLink} ${isActive ? styles.Active : ""}`
              }
            >
              <i className="fas fa-user-plus"></i>sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
