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
    const [currentIndex, setCurrentIndex] = useState(0); // The current question index [0, 1, 2, 3, 4

    // Fetch the questions from the backend
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const Userresponse = await fetch('https://ttapplication-backend.vercel.app/api/questions');
    
            const responseData = await Userresponse.json();
    
            if (!Userresponse.ok) {
              throw new Error(responseData.message);
            }
    
            setLoadedQuestion(responseData.questions); // Set it as an array with the last question
          } catch (error) {
            setError(error.message);
          }
        };
        sendRequest();
      }, []);

      const handleNextClick = () => {
        if (currentIndex < loadedQuestion.length - 1) {
            setCurrentIndex(currentIndex + 1); // This will cause a re-render
        } else {
            alert('This is the last question.');
        }
    };
    
    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1); // This will also cause a re-render
        } else {
            alert('This is the first question.');
        }
    };

    
    console.log(loadedQuestion);
    console.log(currentIndex)
    return (

        <div>
            <Header />
            <div style={{ marginTop: '100px', height: '100px' }}></div>

            
            {loadedQuestion && loadedQuestion.length > 0 && (
                <Card key={currentIndex} info={[loadedQuestion[currentIndex]]} onNext={handleNextClick} />
            )}
            <div className="prevnext">
                <button onClick={handlePrevClick}>Prev</button>
                <button onClick={handleNextClick}>Next</button>
            </div>
        </div>
    
    );
};

export default Content;
