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
        right: '',
        creator:''
    });    
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const response = await fetch(`https://ttapplication-backend.vercel.app/api/questions/${id}`);
                const data = await response.json();
                console.log(data)
                if (response.ok) {
                    // Set the form data with the question data
                    console.log(formData)
                    setFormData({
                        question: data.question.question || '',
                        bio: data.question.bio || '',
                        category: data.question.category || '',
                        tweetboolean: data.question.tweetboolean || false,
                        tweetURL: data.question.tweetURL || '',
                        contentboolean: data.question.contentboolean || false,
                        contentURL: data.question.contentURL || '',
                        left: data.question.left || '',
                        mid: data.question.mid || '',
                        right: data.question.right || '',
                        creator: data.question.creator || ''
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
    console.log("uo", formData)
    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
    
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };





    



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
            category: formData.category.join(', '),
            tweetboolean: formData.tweetboolean,
            tweetURL: formData.tweetURL,
            contentboolean: formData.contentboolean,
            contentURL: formData.contentURL,
            left: formData.left,
            mid: formData.mid,
            right: formData.right,
            creator: formData.creator
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

    const handleHide = async () => {
        if (formData.password !== 'asdfAc12345') {
            setError('Invalid password');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to hide this question?');
        if (confirmDelete) {
            const body2 = JSON.stringify({
                question: formData.question,
                bio: formData.bio,
                category: formData.category.join(', '),
                tweetboolean: formData.tweetboolean,
                tweetURL: formData.tweetURL,
                contentboolean: formData.contentboolean,
                contentURL: formData.contentURL,
                left: formData.left,
                mid: formData.mid,
                right: formData.right,
                creator: formData.creator,
                display: false
            });
            try {
                // Send a PUT request with the form data
                const response = await fetch(`https://ttapplication-backend.vercel.app/api/questions/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any other headers your API expects, such as authentication tokens
                    },
                    body: body2
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
    };

    const handleDelete = async () => {
        if (formData.password !== 'asdfAc12345') {
            setError('Invalid password');
            return;
        }

        const confirmDelete = window.confirm('Are you sure you want to delete this question?');
        if (confirmDelete) {
            try {
                // Send a DELETE request with the form data
                const response = await fetch(`https://ttapplication-backend.vercel.app/api/questions/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include any other headers your API expects, such as authentication tokens
                    },
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    // Alert the user that the update was successful
                    alert('Question deleted successfully!');
                } else {
                    // Alert the user that there was an error with the update
                    alert(data.message || 'Failed to delete the question.');
                }
            } catch (error) {
                // If there is an error, log it and set the error state
                console.error('Error deleting question:', error);
                setError('Failed to delete the question.');
            }
            };
    }

    return (
    <div>
      <div>Delete or do all Edits and click Submit Edit</div>
      <form onSubmit={handleSubmit}>
        <div className='fieldContainer'>
        <div className='formgroup'>
            <textarea
                className='textarea'
                name="creator"
                placeholder="Your Name"
                value={formData.creator}
                onChange={handleInputChange}
                style={{ height: "2em" }}
            />
          </div>
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
            <button type="submit" className='submitButton' onClick={handleSubmit}>Submit Edits</button>

            <Link to={`/AdminPortal`}>
                <button>Back to all Questions</button>
            </Link>
        </div>
    </form>
    <button onClick={handleHide}>Hide</button>
    <button onClick={handleDelete}>Delete</button>

      
      {error && <p>{error}</p>}
    </div>
  );
};

export default Question;
