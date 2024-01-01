import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import '../styles/Header.css';
import logo from "../assets/ThinkThrough.png";
import { useParams } from 'react-router-dom';

const Header = () => {
    const { id } = useParams();
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
                <Link className="nav-link" to={`/DailyQuestion/${id}`}>
                    <button type="button" className="home-button">
                            Question of the Day
                    </button>
                </Link>
            </div>
          <div className="button-container">
              <Link className="nav-link" to={`/Content/${id}`}>
                  <button type="button" className="home-button">
                    More Topics
                  </button>
              </Link>
          </div>
          <div className="button-container">
              <Link className="nav-link" to={`/Profile/${id}`}>
                  <button type="button" className="home-button-yo">
                      Profile
                  </button>
              </Link>
          </div>
      </div>
  </header>
  );
}

export default Header;
