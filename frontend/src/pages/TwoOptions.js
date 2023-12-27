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
            <Header />
            <div className="yo"> Opinion Captured! </div>
            <div className="yoo"> Your opinions are secure and for your eyes only. We will never sell your data. </div>
            <div className="buttonContainer">
                <Link to={`/Content/${email}`}>
                    <button type="button" className="home_signup_button">
                        Explore More Topics 
                    </button>
                </Link>
                <Link to={`/Profile/${email}`}>
                    <button type="button" className="home_signup_button1">
                        See Profile
                    </button>
                </Link>
                <Link to={`/DailyQuestion/${email}`}>
                    <button type="button">
                        Go back to Question of the day
                    </button>
                </Link>

            </div>
        </div>
    )
}



export default TwoOptions;