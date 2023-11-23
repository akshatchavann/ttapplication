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

    const calculateAverageAnswer = (questionId) => {
      const questionData = questionsResponseData.find((q) => q._id === questionId);
    
      if (questionData && questionData.answers.length > 0) {
        const answers = questionData.answers.map(Number); // Convert answer strings to numbers, filter out any non-numeric values
        const validAnswers = answers.filter((answer) => !isNaN(answer));
        const sum = validAnswers.reduce((total, answer) => total + answer, 0);
        const average = sum / validAnswers.length;
        return average.toFixed(2); // Display the average to 2 decimal places
      }
    
      return 'N/A'; // Return 'N/A' if the question is not found or there are no valid answers
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
