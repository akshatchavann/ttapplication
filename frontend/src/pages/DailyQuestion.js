import React from "react";
import "../styles/DailyQuestion.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DQCard from './DQCard';
import CompletedPage from "./CompletedPage";

const DailyQuestion = () => {
    const { email } = useParams();
    const [loadedQuestion, setLoadedQuestion] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestionsAndUserIndex = async () => {
            try {
                // Fetch questions
                const questionsResponse = await fetch('https://ttapplication-backend.vercel.app/api/dailyquestions');
                const questionsData = await questionsResponse.json();
                if (!questionsResponse.ok) {
                    throw new Error(questionsData.message);
                }
                const cleanData = cleanQuestionData(questionsData.questions)
    
                setLoadedQuestion(cleanData[cleanData.length - 1]);
    
            } catch (error) {
                setError(error.message || 'Something went wrong');
            }
        };
    
        fetchQuestionsAndUserIndex();
    }, [email, setLoadedQuestion, setError]);

    const cleanQuestionData = (questionsArray) => {
        return questionsArray.filter(question => question.display === true);
    };  

    const getFormStyle = () => {
        // Check if loadedQuestion is defined and has active links
        const hasActiveLinks =   // Check if loadedQuestion[0] is defined
            (loadedQuestion && loadedQuestion && loadedQuestion.tweetboolean);
        
        // Return the style object based on the condition
        return { paddingTop: hasActiveLinks ? '200px' : '0px', height: '100px' };
    };

    console.log(loadedQuestion)

    return (

        <div>
            <Header />
            <div className="dq-title">Question of the Day</div>

            <div style={getFormStyle()}></div>

            
            {loadedQuestion && (
                <DQCard key={0} info={[loadedQuestion]} />
            )}
        </div>
    
    );
}

export default DailyQuestion;