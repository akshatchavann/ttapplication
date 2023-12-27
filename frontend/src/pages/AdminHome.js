import React from "react";
import "../styles/AdminHome.css";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const AdminHome = () => {
    return (
        <div className="main">
        <Link to={`/AdminDailyQuestion`}>
            <button>Create Daily Questions</button>
        </Link>
        <Link to={`/Admin`}>
            <button>Create Questions</button>
        </Link>
        <Link to={`/AdminPortal`}>
            <button>View and Edit Questions</button>
        </Link>
        <Link to={`/AdminReccs`}>
            <button>View User Reccomendations</button>
        </Link>
        </div>

    )
}


export default AdminHome;

