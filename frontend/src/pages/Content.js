import React from "react";
import "../styles/Content.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from './Card';
import CompletedPage from "./CompletedPage";

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
        if (currentIndex < loadedQuestion.length) {
            setCurrentIndex(currentIndex + 1); // This will cause a re-render
        }
    };
    
    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1); // This will also cause a re-render
        } else {
            alert('This is the first question.');
        }
    };

    const getFormStyle = () => {
        // Check if loadedQuestion is defined and has active links
        const hasActiveLinks =   // Check if loadedQuestion[0] is defined
            (loadedQuestion && loadedQuestion[currentIndex] && loadedQuestion[currentIndex].tweetboolean);
        
        // Return the style object based on the condition
        return { paddingTop: hasActiveLinks ? '200px' : '0px', height: '100px' };
    };

    
    console.log(loadedQuestion);
    console.log(currentIndex)

    return (

        <div>
            <Header />

            <div style={getFormStyle()}></div>

            
            {loadedQuestion && loadedQuestion.length > 0 && loadedQuestion.length > currentIndex && (
                <Card key={currentIndex} info={[loadedQuestion[currentIndex]]} onNext={handleNextClick} />
            )}

            {loadedQuestion && loadedQuestion.length > 0 && loadedQuestion.length === currentIndex && (
                <CompletedPage />
            )}
            <div className="prevnext">
                <button onClick={handlePrevClick}>Previous Question</button>
            </div>
        </div>
    
    );
};

export default Content;
