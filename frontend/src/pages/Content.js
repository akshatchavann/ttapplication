import React from "react";
import "../styles/Content.css";
import logo from "../assets/ThinkThroughLogo.png"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'


const Content = () => {
    return (
        <div>
        <Header />
        <div>content goes here</div>
        </div>
    )
}

export default Content;