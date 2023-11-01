import React from "react";
import "../styles/Home.css";
import logo from "../assets/ThinkThroughLogo.png"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'

const Home = () => {
    return (
        <div className="homecontainter">
            <div className="description">
            <Link className='nav-link' to="/">
                <img src={logo} alt="Website Logo" />
            </Link>
                <h1 id="title">Think Through</h1>
                <h1 className="text" id="homeText">
                    Build Opinions as nuanced as you
                </h1>
                <h1 id="homeText">
                    ThinkThrough is the bold new way to clarify, capture, and compare your opinions on the most complex issues of the day
                </h1>
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