import React from "react";
import "../styles/Profile.css";
import logo from "../assets/ThinkThroughLogo.png"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';




const Profile = () => {

    const { email } = useParams();
    const [ProfileInformation, setProfileInformation] = useState();
    const [Error, setError] = useState(null);   
    
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const response = await fetch(`http://localhost:3000/api/users/${email}`); 
    
            const responseData = await response.json();
    
            if (!response.ok) {
              throw new Error(responseData.message);
            }
    
            setProfileInformation(responseData.user);
          } catch (error) {
            setError(error.message);
          }
        };
        sendRequest();
      }, []);

    console.log(ProfileInformation)

    return (
        <div>
        <Header />
        <div className="profile">
            <h2>Profile Information</h2>
                <div className="profile-details">
                    <div><strong>First Name:</strong> {ProfileInformation && ProfileInformation.firstname}</div>
                    <div><strong>Last Name:</strong> {ProfileInformation && ProfileInformation.lastname}</div>
                    <div><strong>Email:</strong> {ProfileInformation && ProfileInformation.email}</div>
                    <div><strong>Phone Number:</strong> {ProfileInformation && ProfileInformation.phoneNumber}</div>
                </div>

        </div>
        </div>
    )
}

export default Profile;