import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import '../styles/Header.css';
import logo from "../assets/ThinkThroughLogo.png";
import { useParams } from 'react-router-dom';

const Header = () => {
    const { email } = useParams();
  return (
    <header className='header-container'>
      <div className="logo-container">
        <Link className='nav-link' to="/">
          <img src={logo} alt="Website Logo" />
        </Link>
      </div>
      <div className="wrapper">
            <div className="button-container">
                <Link className="nav-link mx-4" to="/">
                    <button type="button" className="home-button">
                        Sign Out
                    </button>
                </Link>
            </div>
            <div className="button-container">
                <Link className="nav-link mx-4" to={`/Content/${email}`}>
                    <button type="button" className="home-button">
                        Home
                    </button>
                </Link>
            </div>
            <div className="button-container">
                <Link className="nav-link mx-4" to={`/Profile/${email}`}>
                    <button type="button" className="home-button">
                        Profile
                    </button>
                </Link>
            </div>
          </div>
    </header>
  );
}

export default Header;
