import React from "react";
import "../styles/AdminPortal.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard'

const AdminPortal = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch('https://ttapplication-backend.vercel.app/api/questions/');
                const data = await response.json();
                if (response.ok) {
                    setQuestions(data.questions);
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
            <div><strong>Questions</strong></div>
            <div>
                {questions.map((question) => (
                    <QuestionCard key={question._id} question={question} />
                ))}
            </div>
            <Link to={`/AdminHome`}>
                <button>Back to Admin Home</button>
            </Link>
        </div>
    );
}

export default AdminPortal;
