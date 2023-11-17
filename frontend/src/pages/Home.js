import React from "react";
import "../styles/Home.css";
import logo from "../assets/ThinkThrough.png"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'

const Home = () => {
    return (
        <div className="homecontainter">
            <div className="description">
            <Link className='nav-link' to="/">
                <img className="logo" src={logo} alt="Website Logo" />
            </Link>
            </div>
            <div className="buttonContainer">
                    <Link to="/UserSignup">
                        <button type="button" className="home_signup_button">
                            Sign up
                        </button>
                    </Link>
                    <Link to="/UserLogin">
                        <button type="button" className="home_signup_button">
                            Login 
                        </button>
                    </Link>
            </div>
        </div>
    )
}

export default Home;