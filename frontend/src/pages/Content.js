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
            const Userresponse = await fetch('http://localhost:3000/api/questions');
    
            const responseData = await Userresponse.json();
    
            if (!Userresponse.ok) {
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
            // First PUT request to update user ratings
            const userResponse = await fetch(`http://localhost:3000/api/users/update/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    ratings, // Include the ratings object for users
                ),
            });
    
            if (!userResponse.ok) {
                const errorData = await userResponse.json();
                setError(errorData.message);
            } else {
                console.log('User ratings submitted successfully');
            }
        } catch (error) {
            console.error(error);
        }
    
        try {
    
            // Second PUT request to update question ratings
            const questionResponse = await fetch(`http://localhost:3000/api/questions/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    ratings, // Include the ratings object for questions
                ),
            });
    
            if (!questionResponse.ok) {
                const errorData = await questionResponse.json();
                setError(errorData.message);
            } else {
                console.log('Question ratings submitted successfully');
            }
        } catch (error) {
            console.error(error);
        }
    };
    

  


    const handleRatingChange = (id, question, value) => {
        setRatings(prevRatings => {
            return {
                id: id,
                qs: question,
                ans: value
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
                                name={`rating-${question.question}`}
                                onChange={e => handleRatingChange(question._id, question.question, e.target.value)}
                                value={ratings.ans || '1'}
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
