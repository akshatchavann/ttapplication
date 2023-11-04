import React from "react";
import "../styles/Content.css";
import logo from "../assets/ThinkThroughLogo.png"
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Content = () => {
    // Retrieve the 'id' parameter from the URL
    const { email } = useParams();
    const [loadedQuestions, setLoadedQuestions] = useState();
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState({});

    // Fetch the questions from the backend
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/questions');
    
            const responseData = await response.json();
    
            if (!response.ok) {
              throw new Error(responseData.message);
            }
    
            setLoadedQuestions(responseData.questions);
          } catch (error) {
            setError(error.message);
          }
        };
        sendRequest();
      }, []);

    const handleSubmitRatings = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`http://localhost:3000/api/users/update/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ratings, // Include the ratings object
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
            } else {
                console.log('Ratings submitted successfully');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRatingChange = (questionId, value) => {
        setRatings(prevRatings => {
            return {
                ...prevRatings,
                [questionId]: value
            }
        });
    }


    console.log(ratings);
    return (
        <div>
        <Header />
        <div>Content goes here</div>
        <div>
            <h2>Loaded Questions</h2>
            {loadedQuestions && loadedQuestions.length > 0 ? (
                <form onSubmit={handleSubmitRatings}>
                    {loadedQuestions.map((question, index) => (
                        <div key={index} className="question">
                            <div>{question.question}</div>
                            <input
                                type="range"
                                min="1"
                                max="7"
                                name={`rating-${question._id}`}
                                onChange={e => handleRatingChange(question._id, e.target.value)}
                                value={ratings[question._id] || '1'}
                            />
                            <div>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                                <span>6</span>
                                <span>7</span>
                            </div>
                        </div>
                    ))}
                    <button type="submit">Submit Ratings</button>
                </form>
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    </div>
    
    );
};

export default Content;
