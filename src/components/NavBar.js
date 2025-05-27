import React from "react";
import { navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import logo from "../assets/logo.png";

function NavBar() {
  return (
    <navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <navbar.Brand>
            <img src={logo} alt="logo" height="45"></img>
          </navbar.Brand>
        </NavLink>
        <navbar.Toggle aria-controls="basic-navbar-nav" />
        <navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signin"
            >
              <i className="fas fa-sign-in-alt"></i>sign in
            </NavLink>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/signup"
            >
              <i className="fas fa-user-plus"></i>sign up
            </NavLink>
          </Nav>
        </navbar.Collapse>
      </Container>
    </navbar>
  );
}

export default NavBar;
