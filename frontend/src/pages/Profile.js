import React from "react";
import "../styles/Profile.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';





const Profile = () => {

    const { email } = useParams();
    const [ProfileInformation, setProfileInformation] = useState();
    const [questionsResponseData, setQuestionsResponseData] = useState([]);
    const [Error, setError] = useState(null);   

    
    useEffect(() => {
      const sendRequest = async () => {
        try {
          // Fetch user profile data
          const userProfileResponse = await fetch(`https://ttapplication-backend.vercel.app/api/users/${email}`);
          const userProfileData = await userProfileResponse.json();
    
          if (!userProfileResponse.ok) {
            throw new Error(userProfileData.message);
          }
    
          setProfileInformation(userProfileData.user);
    
          // Fetch questions data
          const questionsResponse = await fetch(`https://ttapplication-backend.vercel.app/api/questions`);
          const questionsData = await questionsResponse.json();
    
          if (!questionsResponse.ok) {
            throw new Error(questionsData.message);
          }
          setQuestionsResponseData(questionsData.questions);
    
          // Fetch daily questions data
          const dailyQuestionsResponse = await fetch(`https://ttapplication-backend.vercel.app/api/dailyquestions`);
          const dailyQuestionsData = await dailyQuestionsResponse.json();
    
          if (!dailyQuestionsResponse.ok) {
            throw new Error(dailyQuestionsData.message);
          }
    
          // Combine questions and daily questions
          const combinedQuestions = [...questionsData.questions, ...dailyQuestionsData.questions];
    
          setQuestionsResponseData(combinedQuestions);
    
        } catch (error) {
          setError(error.message);
        }
      };
      sendRequest();
    }, []); // Added email to the dependency array
    


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

    const calculateAdjListofAnswers = (questionText) => {
      // Find the question data using question text
      const questionData = questionsResponseData.find((q) => q.question === questionText);
    
      if (questionData) {
        // Convert all answers to numbers (handle both string and number types)
        const validAnswers = questionData.answers.map((answer) => {
          const number = parseFloat(answer);
          return isNaN(number) ? answer : number;
        });
    
        // Create an adjacency list
        const adjacencyList = {};
    
        // Count occurrences of each answer
        validAnswers.forEach((answer) => {
          if (adjacencyList[answer] === undefined) {
            adjacencyList[answer] = 1;
          } else {
            adjacencyList[answer]++;
          }
        });
    
        return adjacencyList;
      }
    
      // If questionData is not found
      return {};
    };
    
    const renderAdjacencyList = (adjacencyList) => {
      return Object.entries(adjacencyList)
        .map(([answer, count]) => ({
          answer: answer,
          count: count
        }))
        .sort((a, b) => parseFloat(a.answer) - parseFloat(b.answer));
    };
    

    const generateChartData = (adjArray, highlightAnswer, allChoices) => {
      if (!allChoices || allChoices.length === 0) {
        return {
          labels: [],
          datasets: [{
            label: '',
            data: [],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
          }],
        };
      }
    
      // Create a map of answer to count
      const countMap = adjArray.reduce((acc, item) => {
        acc[item.answer] = item.count;
        return acc;
      }, {});
    
      // Use allChoices to ensure all options are included
      const labels = allChoices;
      const data = allChoices.map(choice => countMap[choice] || 0);
      const backgroundColors = allChoices.map(choice => choice === highlightAnswer ? 'rgba(255, 255, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)');
    
      return {
        labels: labels,
        datasets: [{
          label: '# of Responses',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
        }],
      };
    };
    

    const findLabels = (questionText) => {
      // Initialize default labels
      let leftLabel = '';
      let midLabel = '';
      let rightLabel = '';
    
      // Find the question in the questionsResponseData
      const questionData = questionsResponseData.find(q => q.question === questionText);
    
      if (questionData) {
        // Assuming the labels are stored in a property of questionData, e.g., labels
        leftLabel = questionData.left;
        midLabel = questionData.mid;
        rightLabel = questionData.right;
      }
    
      // Return the labels
      return { leftLabel, midLabel, rightLabel };
    };
    
    
    
    const getProfileStyle = () => {
      if (ProfileInformation && ProfileInformation.questions && ProfileInformation.questions.length < 2) {
          return { marginTop: '200px' };
      } else if (ProfileInformation && ProfileInformation.questions && ProfileInformation.questions.length < 4) {
          return { marginTop: '500px' };
      } else
          return { marginTop: '1300px' };

    };
  
  
    return (
      <div>
        <Header />
        <div className="profile" style={getProfileStyle()}>
          <div className="profile-details">
            <div>
              <h2>Opinion Comparison</h2>
              {ProfileInformation && ProfileInformation.questions && ProfileInformation.questions.map((question, index) => {
                const adjList = calculateAdjListofAnswers(question); // this is an object
                const adjarray = renderAdjacencyList(adjList);// this is an array
                const allAnswerChoices = [-3,-2,-1,0,1,2,3]
                const { leftLabel, midLabel, rightLabel } = findLabels(question);
                return (
                  <div key={index}>
                    <p><strong>Question:</strong> {question}</p>
                    <p><strong>Your Answer:</strong> {ProfileInformation.answers && ProfileInformation.answers[index] === 4 ? 'Question Skipped' : ProfileInformation.answers[index] + " (Yellow Bar)"}</p>

                    {ProfileInformation.answers && ProfileInformation.answers[index] !== 4 && (
                        <>
                          <div className="chart-container">

                          <Bar data={generateChartData(adjarray, String(ProfileInformation.answers[index]), allAnswerChoices)} />

                          </div>
                          <div className="label-container">
                            <div>{leftLabel}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rightLabel}</div>
                          </div>
                        </>
                      )}


                    <div style={{ height: '10px' }}></div>
                    <>---------------------------------------------------</>
                  </div>

                );
              })}
            </div> 
          </div>
        </div>
      </div>
    )
}

export default Profile;
