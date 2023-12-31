import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import "../styles/DQCard.css";



const DQCard = (props) => {
    const { id } = useParams();
    console.log(id)
    const [ratings, setRatings] = useState(() => {
        if (props.info && props.info.length > 0) {
            return {
                questionId: props.info[0]._id, // Assuming '_id' is the field for the question ID
                qs: props.info[0].question, // Assuming 'question' is the field for the question text
                answer: 0,
                userId: id
            };
        }
        return {};
    });

    const [error, setError] = useState(null);

    //twitter
    useEffect(() => {
        const sendRequest = async () => {
          try {
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
            const userResponse = await fetch(`https://ttapplication-backend.vercel.app/api/users/update/${id}`, {
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
                console.log('Opinion captured! Click Profile to see how your views compared to other users');

            }
        } catch (error) {
            console.error(error);
        }

        try { 
            // Second PUT request to update question ratings
            const questionResponse = await fetch(`https://ttapplication-backend.vercel.app/api/dailyquestions/update`, {
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
                window.location.href = `/TwoOptions/${id}`;
            }

        } catch (error) {
            console.error(error);
        }
    }


    const handleRatingChange = (qid, question, value) => {
        setRatings(prevRatings => {
            return {
                questionId: qid,
                qs: question,
                answer: value,
                userId: id
            }
        });
    }

    const getFormStyle = () => {
        // Check if loadedQuestion is defined and has active links
        const hasActiveLinks =   // Check if loadedQuestion[0] is defined
            (props && props.info && props.info[0].tweetboolean);
        
        // Return the style object based on the condition
        return { marginTop: hasActiveLinks ? '0px' : '250px' };
    };

    const handleSkipButton = async (e) => {
        e.preventDefault();
    
        try {
            // Update the ratings object with a hardcoded value for 'ans' when skipped
            const updatedRatings = { ...ratings, answer: 4 };
    
            // PUT request to update user ratings
            const userResponse = await fetch(`https://ttapplication-backend.vercel.app/api/users/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRatings),
            });
    
            if (!userResponse.ok) {
                const errorData = await userResponse.json();
                setError(errorData.message);
            } else {
                console.log('Opinion captured! Click Profile to see how your views compared to other users');
                window.location.href = `/TwoOptions/${id}`;

            }
        } catch (error) {
            console.error(error);
        }
    }
    
    console.log(ratings);

    return (
        <div className="form">
        {props && props.info && props.info[0] ? (
            <div>
            <form onSubmit={handleSubmitRatings}>
                {props.info.map((question, index) => (
                    <div key={index} className="question">
                        <div className="question-creator">Posted by: {question.creator}</div>
                        <blockquote className="twitter-tweet twitter-tweet-rendered">
                            <a href={question.tweetURL}></a>
                        </blockquote>
                        <div className="titl"> Summary </div>
                        <div className="question-bio">{question.bio}</div>

                        <div style={{ height: '10px' }}></div>
                        <div className="titl"> Question </div>
                        <div className="question-text">{question.question}</div> 
                        <div style={{ height: '10px' }}></div>

                        



                        {question.tweetboolean && (
                            <a
                                className="learn"
                                href={question.tweetURL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                See this Tweet
                            </a>
                        )}
                        <div style={{ height: '10px' }}></div>

                        {question.contentboolean && (
                           
                            <a
                                className="learn"
                                href= {question.contentURL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                See this News Story
                            </a>
                        )}

                        <div style={{ height: '10px' }}></div>
                        <input
                            type="range"
                            min="-3"
                            max="3"
                            name={`rating-${question.question}`}
                            onChange={e => handleRatingChange(question._id, question.question, e.target.value)}
                            value={ratings.answer || '0'}
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



                        <div>


                        </div>
                        <div className="currans">
                            Current Answer: {ratings.answer || '0'}
                        </div>

                    </div>
                ))}
                <button className="sub" type="submit">Submit</button>
                <div className="props-length-display">
                    {props.len}
                </div>
            </form>
            <div style={{ height: '10px' }}></div>
            <div className="button-container">
                <button className="skip" onClick={handleSkipButton}>Skip Question</button>
            </div>
            </div>
            
        ) : (
            <p>No questions available.</p>
        )}
    </div>


    );  

}


export default DQCard;