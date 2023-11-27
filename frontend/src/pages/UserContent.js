import React from "react";
import "../styles/UserContent.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const UserContent = () => {
    const [formData, setFormData] = useState({ topic: '', questions: '', links: '' });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://ttapplication-backend.vercel.app/api/reccs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('Recommendation submitted successfully')
                console.log(responseData);
                // Handle success (e.g., clear form, show message)
            } else {
                throw new Error('Failed to submit the recommendation');
            }
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="main">
            <Header />
            <form onSubmit={handleSubmit}>
                <div> Hello, fill out what you want us to ask!</div>

                <div style={{ height: '10px' }}></div>

                <label>Topic:</label>
                <div className="form-group">
                    <textarea 
                        name="topic" 
                        value={formData.topic} 
                        placeholder="Topic example = “Immigration” "
                        onChange={handleInputChange} 
                    />
                </div>

                <div style={{ height: '10px' }}></div>

                <label>Questions:</label>
                <div className="form-group">
                    <textarea 
                        name="questions" 
                        value={formData.questions} 
                        placeholder="Question = Should people seeking asylum be welcomed into the U.S. or made to wait elsewhere while they are processed? "
                        onChange={handleInputChange} 
                    />
                </div>

                <div style={{ height: '10px' }}></div>

                <label>Links:</label>
                <div className="form-group">
                    <textarea 
                        name="links" 
                        value={formData.links} 
                        onChange={handleInputChange} 
                        placeholder="Link = www.cnn.com/specificstory)"
                    />
                </div>
                <div style={{ height: '10px' }}></div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserContent;