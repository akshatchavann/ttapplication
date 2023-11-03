import React from "react";
import "../styles/Content.css";
import logo from "../assets/ThinkThroughLogo.png"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';

const Content = () => {
    // Retrieve the 'id' parameter from the URL
    const { email } = useParams();

    return (
        <div>
            <Header />
            <div>Content goes here</div>
            <div>Email: {email}</div>
        </div>
    );
};

export default Content;
