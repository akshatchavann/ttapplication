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
    const { id } = useParams();
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
    }, [setLoadedQuestion, setError]);

    const cleanQuestionData = (questionsArray) => {
        return questionsArray.filter(question => question.display === true);
    };  


    return (

        <div>
            <Header />
            <div style={{ height: '10px' }}></div>
            <div className="dq-title">Question of the Day</div>

            
            {loadedQuestion && (
                <DQCard key={0} info={[loadedQuestion]}/>
            )}
        </div>
    
    );
}

export default DailyQuestion;