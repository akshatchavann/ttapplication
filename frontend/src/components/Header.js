import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import '../styles/Header.css';
import logo from "../assets/ThinkThroughLogo.png";

const Header = () => {
  return (
    <header className='header-container'>
      <div className="logo-container">
        <Link className='nav-link' to="/">
          <img src={logo} alt="Website Logo" />
        </Link>
      </div>
      <div className='nav-container'>
        <Nav>
        </Nav>
      </div>
    </header>
  );
}

export default Header;
