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
    const { id } = useParams();
    const [loadedQuestion, setLoadedQuestion] = useState();
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); 
    


    useEffect(() => {
        const fetchQuestionsAndUserIndex = async () => {
            try {
                // Fetch questions
                const questionsResponse = await fetch('https://ttapplication-backend.vercel.app/api/questions');
                const questionsData = await questionsResponse.json();
                if (!questionsResponse.ok) {
                    throw new Error(questionsData.message);
                }
                const cleanData = cleanQuestionData(questionsData.questions)

                setLoadedQuestion(cleanData);
                // Fetch user's question index
                const userResponse = await fetch(`https://ttapplication-backend.vercel.app/api/users/id/${id}`);
                if (!userResponse.ok) {
                    throw new Error('Could not fetch user data');
                }
                const userData = await userResponse.json();
                let dbQuestionIndex = userData.user.questionindex;
    
                if (dbQuestionIndex > cleanData.length) {

                    // Update the user object with the new question index
                    const updatedUser = { ...userData.user, questionindex: cleanData.length };
                    
                    const putResponse = await fetch(`https://ttapplication-backend.vercel.app/api/users/fullupdate/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedUser),
                    });
    
                    if (!putResponse.ok) {
                        throw new Error('Could not update user question index');
                    } else {
                        dbQuestionIndex = cleanData.length;
                    }
                }
    
                setCurrentIndex(dbQuestionIndex);
            } catch (error) {
                setError(error.message || 'Something went wrong');
            }
        };
    
        fetchQuestionsAndUserIndex();
    }, [setLoadedQuestion, setError]);
    
    const handleNextClick = async () => {
        try {
            // Make a GET request to fetch the current questionindex for the user
            const response = await fetch(`https://ttapplication-backend.vercel.app/api/users/id/${id}`);
            if (!response.ok) {
                throw new Error('Could not fetch question index');
            }
    
            const data = await response.json();
            const dbQuestionIndex = data.user.questionindex; // assuming the response has a questionindex field

            // Compare and update currentIndex only if it is less than the dbQuestionIndex
            if (currentIndex < dbQuestionIndex) {
                setCurrentIndex(currentIndex + 1);
            } else if (currentIndex === dbQuestionIndex) {
                // Increment both currentIndex and dbQuestionIndex
                setCurrentIndex(currentIndex + 1);
    
                // Send a PUT request to increment questionindex in the database
                const updateResponse = await fetch(`https://ttapplication-backend.vercel.app/api/users/increasequestion/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!updateResponse.ok) {
                    throw new Error('Could not update question index');
                }
    
                // Optionally handle the response from the PUT request
                const updateData = await updateResponse.json();
            }
        } catch (error) {
            console.error('There was an error updating the question index: ', error);
        }
    };
    
    const cleanQuestionData = (questionsArray) => {
        return questionsArray.filter(question => question.display === true);
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

    console.log(currentIndex)
    return (

        <div>
            <Header />

            <div style={getFormStyle()}></div>

            
            {loadedQuestion && loadedQuestion.length > 0 && loadedQuestion.length > currentIndex && (
                <Card key={currentIndex} info={[loadedQuestion[currentIndex]]} onNext={handleNextClick} len={`(Question ${currentIndex + 1} of ${loadedQuestion.length})`} />
            )}

            {loadedQuestion && loadedQuestion.length > 0 && loadedQuestion.length <= currentIndex && (
                <CompletedPage />
            )}
            <div className="prevnext">
                <button onClick={handlePrevClick}>Previous Question</button>
            </div>
        </div>
    
    );
};

export default Content;
