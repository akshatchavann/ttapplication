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
import AdminReccs from './pages/AdminReccs.js';
import AdminHome from './pages/AdminHome.js';
import UserContent from './pages/UserContent.js';
import DailyQuestion from './pages/DailyQuestion.js';
import TwoOptions from './pages/TwoOptions.js';
import AdminDailyQuestion from './pages/AdminDailyQuestion.js';
import AdminDQ from './pages/AdminDQ.js';
import DQquestion from './pages/DQquestion.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserSignup" element={<UserSignup />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/Content/:id" element={<Content />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/Admin" element={<Admin />} /> 
          <Route path="/AdminPortal" element={<AdminPortal />} />
          <Route path="Question/:id" element={<Question />} />
          <Route path="/DQquestion/:id" element={<DQquestion />} />
          <Route path="/AdminReccs" element={<AdminReccs />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/UserContent/:id" element={<UserContent />} />
          <Route path="/DailyQuestion/:id" element={<DailyQuestion />} />
          <Route path="/TwoOptions/:id" element={<TwoOptions />} />
          <Route path="/AdminDailyQuestion" element={<AdminDailyQuestion />} />
          <Route path="/AdminDQ" element={<AdminDQ />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
