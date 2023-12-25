import React from "react";
import "../styles/QuestionCard.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const QuestionCard = (props) => {
    const questionId = props.question._id; // Assuming each question has an '_id' field

    return (
        <div className="main"> 
            Question:
            <div className="question-card">
                {props.question.question}
            </div>
            Display:
            <div className="question-card">
                {String(props.question.display)}
            </div>
            <div style={{ height: '10px' }}></div>
            <Link to={`/Question/${questionId}`}>
                <button>Edit</button>
            </Link>
        </div>
    );
}



export default QuestionCard;