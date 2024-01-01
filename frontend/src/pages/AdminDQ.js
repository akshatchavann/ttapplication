import React from "react";
import "../styles/AdminPortal.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DQQuestioncard from './DQQuestioncard'

const AdminDQ = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('https://ttapplication-backend.vercel.app/api/dailyquestions/');
                const data = await response.json();
                const lastdata = data.questions[data.questions.length - 1];
                if (response.ok) {
                    setQuestions([lastdata]);
                } else {
                    throw new Error(data.message || "Failed to fetch questions");
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    return (
        <div className="main">
            <div><strong>Daily Question</strong></div>
            <div style={{ height: '10px' }}></div>
            <div>
                {questions.map((question) => (
                    <DQQuestioncard key={question._id} question={question} />
                ))}
            </div>
            <Link to={`/AdminHome`}>
                <button>Back to Admin Home</button>
            </Link>
        </div>
    );
}

export default AdminDQ;
