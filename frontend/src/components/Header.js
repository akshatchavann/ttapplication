import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import '../styles/Header.css';
import logo from "../assets/ThinkThrough.png";
import { useParams } from 'react-router-dom';

const Header = () => {
    const { email } = useParams();
  return (
      <header className='header-container'>
      <div className="left-container">
          <div className="button-container">
              <Link className="nav-link" to="/">
                  <button type="button" className="home-button">
                      Sign Out
                  </button>
              </Link>
          </div>
      </div>

      <div className="right-container">
          <div className="button-container">
              <Link className="nav-link" to={`/Content/${email}`}>
                  <button type="button" className="home-button">
                      Home
                  </button>
              </Link>
          </div>
          <div className="button-container">
                <Link className="nav-link" to={`/DailyQuestion/${email}`}>
                    <button type="button" className="home-button">
                        Daily Question
                    </button>
                </Link>
            </div>
          <div className="button-container">
              <Link className="nav-link" to={`/Profile/${email}`}>
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
