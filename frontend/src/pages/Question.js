import React from "react";
import "../styles/Question.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Question = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        question: '',
        bio: '',
        category: '',
        tweetboolean: false,
        tweetURL: '',
        contentboolean: false,
        contentURL: '',
        password: '',
        left: '',
        mid: '',
        right: ''
    });    
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const response = await fetch(`https://ttapplication-backend.vercel.app/api/questions/${id}`);
                const data = await response.json();
                if (response.ok) {
                    // Set the form data with the question data
                    setFormData({
                        question: data.question.question,
                        bio: data.question.bio,
                        category: data.question.category,
                        tweetboolean: data.question.tweetboolean,
                        tweetURL: data.question.tweetURL,
                        contentboolean: data.question.contentboolean,
                        contentURL: data.question.contentURL,
                        left: data.question.left,
                        mid: data.question.mid,
                        right: data.question.right
                    });
                } else {
                    throw new Error(data.message || "Failed to fetch question data");
                }
            } catch (error) {
                console.error("Error fetching question data:", error);
                setError(error.message);
            }
        };

        fetchQuestionData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
    
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };





    


    console.log(formData);
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (formData.password !== 'asdfAc12345') {
            setError('Invalid password');
            return;
        }

        // Construct the request body using the formData state
        const body = JSON.stringify({
            question: formData.question,
            bio: formData.bio,
            category: formData.category,
            tweetboolean: formData.tweetboolean,
            tweetURL: formData.tweetURL,
            contentboolean: formData.contentboolean,
            contentURL: formData.contentURL,
            left: formData.left,
            mid: formData.mid,
            right: formData.right
        });

        try {
            // Send a PUT request with the form data
            const response = await fetch(`https://ttapplication-backend.vercel.app/api/questions/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any other headers your API expects, such as authentication tokens
                },
                body: body
            });

            const data = await response.json();

            if (response.ok) {
                // Alert the user that the update was successful
                alert('Question updated successfully!');
            } else {
                // Alert the user that there was an error with the update
                alert(data.message || 'Failed to update the question.');
            }
        } catch (error) {
            // If there is an error, log it and set the error state
            console.error('Error updating question:', error);
            setError('Failed to update the question.');
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this question?');
        if (confirmDelete) {
            try {
                const response = await fetch(`https://ttapplication-backend.vercel.app/api/questions/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        // Include any necessary headers, such as content type or authentication tokens
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert('Question deleted successfully.');
                    // Optionally, redirect or perform additional actions after successful deletion
                } else {
                    const data = await response.json();
                    alert(data.message || 'Failed to delete the question.');
                }
            } catch (error) {
                console.error('Error deleting question:', error);
                alert('An error occurred while trying to delete the question.');
            }
        }
    };



    return (
    <div>
      <div>Delete or do all Edits and click Submit Edit</div>
      <form onSubmit={handleSubmit}>
        <div className='fieldContainer'>

          <div className='formgroup'>
            <textarea
                className='textarea'
                name="question"
                placeholder="Question Name"
                value={formData.question}
                onChange={handleInputChange}
                style={{ height: "10em" }}
            />
          </div>
          <div className='formgroup'>
            <textarea
                className='textarea'
                name="bio"
                placeholder="Question Bio"
                value={formData.bio}
                onChange={handleInputChange}
                style={{ height: "10em" }}
            />
          </div>
          <div className='formgroup'>
            <textarea
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
            />
          </div>
          <div className='formgroup'>
            <label className='checkboxLabel'>
            Include Tweet URL
                <input
                    type="checkbox"
                    name="tweetboolean"
                    checked={formData.tweetboolean}
                    onChange={handleInputChange}
                />
                
            </label>
          </div>

          <div className='formgroup'>
            {(
                <input
                    className='inputField'
                    type="text"
                    name="tweetURL"
                    placeholder="Tweet URL"
                    value={formData.tweetURL}
                    onChange={handleInputChange}
                />
            )}
          </div>
          <div className='formgroup'>
            <label className='checkboxLabel'>
                Include Other Content URL:
                <input
                    type="checkbox"
                    name="contentboolean"
                    checked={formData.contentboolean}
                    onChange={handleInputChange}
                />
            </label>
          </div>
          <div className='formgroup'>
            { (
                <input
                    className='inputField'
                    type="text"
                    name="contentURL"
                    placeholder="Other Content URL"
                    value={formData.contentURL}
                    onChange={handleInputChange}
                />
            )}
            </div>
            <div className='formgroup'>
            <label className='form-label'>
                Left Tag:
                <input
                    className='inputField'
                    type="text"
                    name="left"
                    placeholder="Left Tag"
                    value={formData.left}
                    onChange={handleInputChange}
                />
            </label>
            </div>
            <div className='formgroup'>
            <label className='form-label'>
                Mid Tag:
                <input
                    className='inputField'
                    type="text"
                    name="mid"
                    placeholder="Mid Tag"
                    value={formData.mid}
                    onChange={handleInputChange}
                />
            </label>
            </div>
            
            <div className='formgroup'>
            <label className='form-label'>
                Right Tag:
                <input
                    className='inputField'
                    type="text"
                    name="right"
                    placeholder="Right Tag"
                    value={formData.right}
                    onChange={handleInputChange}
                />
            </label>
            </div>
            <div className='formgroup'>
            <label className='form-label'>
                Password:
                <input
                    className='inputField'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
            </label>
            </div>
            <button type="submit" className='submitButton'>Submit Edits</button>
            <button onClick={handleDelete}>Delete</button>
            <Link to={`/AdminPortal`}>
                <button>Back to all Questions</button>
            </Link>
        </div>
    </form>

      
      {error && <p>{error}</p>}
    </div>
  );
};

export default Question;
