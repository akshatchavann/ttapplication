import React from "react";
import "../styles/Content.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Content = () => {
    // Retrieve the 'id' parameter from the URL
    const { email } = useParams();
    const [loadedQuestion, setLoadedQuestion] = useState();
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState({});

    // Fetch the questions from the backend
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const Userresponse = await fetch('https://ttapplication-backend.vercel.app/api/questions');
    
            const responseData = await Userresponse.json();
    
            if (!Userresponse.ok) {
              throw new Error(responseData.message);
            }
    
            const lastQuestion = responseData.questions[responseData.questions.length - 1];
            setLoadedQuestion([lastQuestion]); // Set it as an array with the last question
            setTimeout(() => {
                if (window.twttr) {
                    console.log('twttr is loaded');
                    window.twttr.widgets.load();
                }
            }, 1000);
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
            const userResponse = await fetch(`https://ttapplication-backend.vercel.app/api/users/update/${email}`, {
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
                console.log('Opinion captured! Click the "Profile" button to see more.');
            }
        } catch (error) {
            console.error(error);
        }
    
        try { 
            // Second PUT request to update question ratings
            const questionResponse = await fetch(`https://ttapplication-backend.vercel.app/api/questions/update`, {
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

            alert('Opinion captured! Click the "Profile" button to see more.');
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

    console.log(loadedQuestion)
    return (
        <div>
        <Header />
        <div>
            {loadedQuestion && loadedQuestion.length > 0 ? (
                <form onSubmit={handleSubmitRatings}>
                    {loadedQuestion.map((question, index) => (
                        <div key={index} className="question">
                            <blockquote className="twitter-tweet twitter-tweet-rendered">
                                <a href={question.tweetURL}></a>
                            </blockquote>
                            <div>{question.question}</div>  
                            <div>{question.bio}</div>

                            {question.tweetboolean && (
                                <a 
                                    className="learn" 
                                    href="https://twitter.com/elonmusk/status/1724908287471272299" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Learn More
                                </a>
                            )}

                            {question.contentboolean && (
                                
                                <a 
                                    className="learn" 
                                    href="your_content_url_here" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    Learn More
                                </a>
                            )}

                            <input
                                type="range"
                                min="-3"
                                max="3"
                                name={`rating-${question.question}`}
                                onChange={e => handleRatingChange(question._id, question.question, e.target.value)}
                                value={ratings.ans || '-3'}
                            />
                            <div className="slider-labels">
                                <span> {question.left} </span>
                                <span> </span>
                                <span></span>
                                <span>{question.mid}</span>
                                <span></span>
                                <span></span>
                                <span>{question.right}</span>
                            </div>                 
                            <div className="slider-labels">
                                <span> -3</span>
                                <span>-2</span>
                                <span>-1</span>
                                <span>0</span>
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                            </div>

                            <div>

                            </div>
                            <div className="currans">
                                Current Answer: {ratings.ans || '1'}
                            </div>
                        </div>
                    ))}
                    <button className="sub" type="submit">Submit</button>
                </form>
            ) : (
                <p>No questions available.</p>
            )}
        </div>
    </div>
    
    );
};

export default Content;
