import React from "react";
import { useParams, Link } from 'react-router-dom';
import "../styles/CompletedPage.css";

const CompletedPage = () => {
    const { email } = useParams(); // Retrieve the 'email' parameter from the URL

    return (
        <div className="completedpage">

            <div className="maintext"> Check back soon for fresh questions that reflect the news of the day! </div>
            <div style={{ height: '10px' }}></div>
            <div className="maintext"> In the meantime, click <Link className='prof' to={`/Profile/${email}`}>Profile</Link> to see how your views compared to other users. </div>
            <div style={{ height: '10px' }}></div>
            <div> 
                Want to submit a recommendation for content? Click 
                <Link className="prof" to={`/UserContent/${email}`}> here </Link> 
                to submit recommendations!
            </div>
        </div>
    );
}

export default CompletedPage;
