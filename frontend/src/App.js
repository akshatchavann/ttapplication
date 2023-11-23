import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


import Home from './pages/Home.js';
import UserSignup from './pages/UserSignup.js'; 
import UserLogin from './pages/UserLogin.js';
import Content from './pages/Content';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AdminPortal from './pages/AdminPortal';
import Question from './pages/Question.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserSignup" element={<UserSignup />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/Content/:email" element={<Content />} />
          <Route path="/Profile/:email" element={<Profile />} />
          <Route path="/Admin" element={<Admin />} /> 
          <Route path="/AdminPortal" element={<AdminPortal />} />
          <Route path="Question/:id" element={<Question />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
