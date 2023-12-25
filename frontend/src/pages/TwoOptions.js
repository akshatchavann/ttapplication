import React from "react";
import "../styles/TwoOptions.css";
import logo from "../assets/ThinkThrough.png";
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom'; 
import Header from '../components/Header';

const TwoOptions = () => {
    const { email } = useParams();
    return (
        <div>
            <div className="yo"> Opinion Captured! </div>
            <div className="yoo"> Your opinions are safe and secure. We will never sell your data. </div>
            <div className="buttonContainer">
                <Link to={`/Content/${email}`}>
                    <button type="button" className="home_signup_button">
                        More Topics 
                    </button>
                </Link>
                <Link to={`/Profile/${email}`}>
                    <button type="button" className="home_signup_button">
                        See Profile
                    </button>
                </Link>
            </div>
        </div>
    )
}



export default TwoOptions;