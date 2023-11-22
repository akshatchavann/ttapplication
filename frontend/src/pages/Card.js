import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import "../styles/Card.css";



const Card = (props) => {
    const [ratings, setRatings] = useState({});
    const [error, setError] = useState(null);
    const { email } = useParams();


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
                alert('Opinion captured! Click the "Profile" button to see more.');
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleRatingChange = (id, question, value) => {
        setRatings(prevRatings => {
            return {
                id: id,
                qs: question,
                ans: value
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
    return (
        <div className="form" style={getFormStyle()}>
        {props && props.info && props.info[0] ? (
            <form onSubmit={handleSubmitRatings}>
                {props.info.map((question, index) => (
                    <div key={index} className="question">
                        <blockquote className="twitter-tweet twitter-tweet-rendered">
                            <a href={question.tweetURL}></a>
                        </blockquote>
                        <div>{question.bio}</div>
                        <div className="question-text">{question.question}</div> 


                        {question.tweetboolean && (
                            <a
                                className="learn"
                                href={question.tweetURL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Learn More tweet
                            </a>
                        )}


                        {question.contentboolean && (
                           
                            <a
                                className="learn"
                                href= {question.contentURL}
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
                            value={ratings.ans || '0'}
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
                            Current Answer: {ratings.ans || '0'}
                        </div>
                    </div>
                ))}
                <button className="sub" type="submit">Submit</button>
            </form>
        ) : (
            <p>No questions available.</p>
        )}
    </div>


    );  

}


export default Card;