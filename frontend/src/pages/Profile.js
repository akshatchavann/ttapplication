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

    const { id } = useParams();
    const [ProfileInformation, setProfileInformation] = useState();
    const [questionsResponseData, setQuestionsResponseData] = useState([]);
    const [Error, setError] = useState(null);   

    
    useEffect(() => {
      const sendRequest = async () => {
        try {
          // Fetch user profile data
          const userProfileResponse = await fetch(`https://ttapplication-backend.vercel.app/api/users/id/${id}`);
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

    const calculateAdjListofAnswers = (questionObject) => {
      // Assuming each questionObject contains an 'answers' array
      const answersArray = questionObject.answers;
  
      // Create an adjacency list
      const adjacencyList = {};
  
      // Count occurrences of each answer
      answersArray.forEach((answerObj) => {
          // Extract the answer, assuming each answerObj has an 'answer' property
          const answer = answerObj.answer;
          
          // Convert answer to number if possible
          const number = parseFloat(answer);
          const validAnswer = isNaN(number) ? answer : number;
  
          // Update the count in the adjacency list
          if (adjacencyList[validAnswer] === undefined) {
              adjacencyList[validAnswer] = 1;
          } else {
              adjacencyList[validAnswer]++;
          }
      });
  
      return adjacencyList;
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
        acc[String(item.answer)] = item.count; // Ensure the keys are strings
        return acc;
      }, {});
    
      // Use allChoices to ensure all options are included
      const labels = allChoices.map(String); // Convert all choices to strings
      const data = labels.map(label => countMap[label] || 0);
      const backgroundColors = labels.map(label => 
        label === String(highlightAnswer) ? 'rgba(255, 255, 0, 0.5)' : 'rgba(0, 0, 255, 0.5)'
      );
    
      return {
        labels: labels,
        datasets: [{
          label: '= # of Responses',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(0, 0, 255, 1)',
          borderWidth: 1,
        }],
      };
    };
    
    

    const findLabels = (question) => {
      // Initialize default labels
      let leftLabel = '';
      let midLabel = '';
      let rightLabel = '';
    
    
      if (question) {
        // Assuming the labels are stored in a property of questionData, e.g., labels
        leftLabel = question.left;
        midLabel = question.mid;
        rightLabel = question.right;
      }
    
      // Return the labels
      return { leftLabel, midLabel, rightLabel };
    };
    
    
    
    const getProfileStyle = () => {
      const muilt = ((ProfileInformation && ProfileInformation.QnA && ProfileInformation.QnA.length) || 0) * 200;
      
        return { marginTop: muilt + 'px' };

    };

  const findQuestionById = (questionId, questions) => {
      return questions.find(question => question._id === questionId);
  };
  
    return (
      <div>
        <Header />
        <div className="profile" style={getProfileStyle()}>
          <div className="profile-details">
            <div>
              <h2>Opinion Comparison</h2>

              {
                  ProfileInformation && ProfileInformation.QnA && ProfileInformation.QnA.map((qna, index) => {
                      const question = findQuestionById(qna.questionId, questionsResponseData); // Assuming questionResponseData is your array of questions
                      if (!question) return null; // Skip if the question is not found

                      // Assuming calculateAdjListofAnswers and other functions are defined and work with the question object
                      const adjList = calculateAdjListofAnswers(question);
                      const adjarray = renderAdjacencyList(adjList);
                      const allAnswerChoices = [-3, -2, -1, 0, 1, 2, 3];
                      const { leftLabel, midLabel, rightLabel } = findLabels(question);

                      return (
                          <div key={index}>
                              <p><strong>Question:</strong> {question.question}</p>
                              <p>
                                  <strong>Your Answer:</strong> 
                                  {qna.answer === "4" ? 'Skipped' : `${qna.answer} (Yellow Bar)`}
                              </p>

                              {qna.answer !== "4" && (
                                  <>
                                      <div className="chart-container">
                                          <Bar data={generateChartData(adjarray, String(qna.answer), allAnswerChoices)} />
                                      </div>
                                      <div className="label-container">
                                          <div>{leftLabel}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{rightLabel}</div>
                                      </div>

                                      <div style={{ height: '10px' }}></div>
                                      <>---------------------------------------------------</>
                                  </>
                              )}
</div>
                      );
                  })
              }
            </div> 
          </div>
        </div>
      </div>
    )
}

export default Profile;
