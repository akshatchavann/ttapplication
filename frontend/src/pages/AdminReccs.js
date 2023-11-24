import React from "react";
import "../styles/AdminReccs.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReccCard from './ReccCard'


const AdminReccs = () => {
    const [reccs, setReccs] = useState([]);

    useEffect(() => {
        const fetchReccs = async () => {
            try {
                const response = await fetch('https://ttapplication-backend.vercel.app/api/reccs/');
                const data = await response.json();
                if (response.ok) {
                    setReccs(data.reccs);
                } else {
                    throw new Error(data.message || 'Failed to fetch recommendations.');
                }
            } catch (error) {
                console.error('Error fetching recommendations:', error);
                // Handle the error appropriately
            }
        };

        fetchReccs();
    }, []);
    console.log(reccs)
    return (
        <div>
            <div> User Reccomendations</div>
            {reccs.map((recc) => (
                <ReccCard 
                    key={recc._id}
                    topic={recc.topic}
                    questions={recc.questions}
                    links={recc.links}
                />
            ))}
             <Link to={`/AdminHome`}>
                <button>Back to Admin Home</button>
            </Link>
        </div>
    );
}

export default AdminReccs;