import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/Header'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import "../styles/CompletedPage.css";


const CompletedPage = () => {
    return (
        <div className="maintext"> Thank you for completing all of the questions!</div>
    )
}


export default CompletedPage;