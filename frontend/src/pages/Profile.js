import React from "react";
import "../styles/Profile.css";
import logo from "../assets/ThinkThroughLogo.png"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';




const Profile = () => {

    const { email } = useParams();

    return (
        <div>
        <Header />
        <div>profile goes here</div>
        <div>Email: {email}</div>
        </div>
    )
}

export default Profile;