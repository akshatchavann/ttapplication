import React from "react";
import "../styles/Content.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from './Card';

const Content = () => {
    // Retrieve the 'id' parameter from the URL
    const { email } = useParams();
    const [loadedQuestion, setLoadedQuestion] = useState();
    const [error, setError] = useState(null);

    // Fetch the questions from the backend
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const Userresponse = await fetch('https://ttapplication-backend.vercel.app/api/questions');
    
            const responseData = await Userresponse.json();
    
            if (!Userresponse.ok) {
              throw new Error(responseData.message);
            }
    
            const lastQuestion = responseData.questions[responseData.questions.length - 1];
            setLoadedQuestion([lastQuestion]); // Set it as an array with the last question
          } catch (error) {
            setError(error.message);
          }
        };
        sendRequest();
      }, []);

    
    
    return (

    <div>
        <Header />
        <div style={{ marginTop: '100px' }}></div>

        {loadedQuestion && loadedQuestion[0] && (
                <Card info={loadedQuestion} />
            )}
    </div>
    
    );
};

export default Content;
