import React from "react";
import "../styles/ReccCard.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const ReccCard = (props) => {
    return (
        <div className="recc-card">
            <>---------------------------------------------------</>
            <div><strong>Topic:</strong> {props.topic || 'N/A'}</div>
            <div><strong>Question:</strong> {props.questions || 'N/A'}</div>
            <div><strong>Link:</strong> {props.links ? <a href={props.links} target="_blank" rel="noopener noreferrer">{props.links}</a> : 'N/A'}</div>
            <>---------------------------------------------------</>
        </div>
    );
}



export default ReccCard;

