import React from "react";
import { useParams, Link } from 'react-router-dom';
import "../styles/CompletedPage.css";

const CompletedPage = () => {
    const { email } = useParams(); // Retrieve the 'email' parameter from the URL

    return (
        <div className="completedpage">
            <div className="maintext"> Check back soon for fresh questions that reflect the news of the day! </div>
            <div style={{ height: '10px' }}></div>
            <div className="maintext"> In the meantime, click <Link className='prof' to={`/Profile/${email}`}>Profile</Link> to see your answers to previous questions. </div>
        </div>
    );
}

export default CompletedPage;
