import React from "react";
import "../styles/Profile.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';




const Profile = () => {

    const { email } = useParams();
    const [ProfileInformation, setProfileInformation] = useState();
    const [questionsResponseData, setQuestionsResponseData] = useState([]);
    const [Error, setError] = useState(null);   

    
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const response = await fetch(`https://ttapplication-backend.vercel.app/api/users/${email}`); 
    
            const responseData = await response.json();
    
            if (!response.ok) {
              throw new Error(responseData.message);
            }
    
            setProfileInformation(responseData.user);


          // Fetch questions data
          const questionsResponse = await fetch(`https://ttapplication-backend.vercel.app/api/questions`);
          const questionsResponseData = await questionsResponse.json();

          if (!questionsResponse.ok) {
            throw new Error(questionsResponseData.message);
          }

          setQuestionsResponseData(questionsResponseData.questions);
          } catch (error) {
            setError(error.message);
          }
        };
        sendRequest();
      }, []);

    console.log(ProfileInformation)

    const calculateAverageAnswer = (questionText) => {
      // Find the question data using question text
      const questionData = questionsResponseData.find((q) => q.question === questionText);
    
      if (questionData) {
        // Convert all answers to numbers, filter out any non-numeric values
        const validAnswers = questionData.answers
          .map((answer) => (typeof answer === 'number' ? answer : parseFloat(answer)))
          .filter((answer) => !isNaN(answer));
    
        // Calculate the sum and average of the valid answers
        const sum = validAnswers.reduce((total, answer) => total + answer, 0);
        const average = sum / validAnswers.length;
    
        // Return the average to 2 decimal places, or 'N/A' if there are no valid answers
        return validAnswers.length > 0 ? average.toFixed(2) : 'N/A';
      }
    
      // Return 'N/A' if the question is not found
      return 'N/A';
    };
    
    

    return (
      <div>
        <Header />
        <div className="profile">
          <h2>Profile Information</h2>
          <div className="profile-details">
            <div><strong>First Name:</strong> {ProfileInformation && ProfileInformation.firstname}</div>
            <div><strong>Last Name:</strong> {ProfileInformation && ProfileInformation.lastname}</div>
            <div><strong>Email:</strong> {ProfileInformation && ProfileInformation.email}</div>
            <div><strong>Phone Number:</strong> {ProfileInformation && ProfileInformation.phoneNumber}</div>
            <div>
              <h2>Questions and Answers</h2>
              {ProfileInformation && ProfileInformation.questions && ProfileInformation.questions.map((question, index) => (
                <div key={index}>
                  <p><strong>Question:</strong> {question}</p>
                  <p><strong>Answer:</strong> {ProfileInformation.answers && ProfileInformation.answers[index]}</p>
                  <p><strong>Average Answer:</strong> {calculateAverageAnswer(question)}</p>
                  <>---------------------------------------------------</>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}

export default Profile;
