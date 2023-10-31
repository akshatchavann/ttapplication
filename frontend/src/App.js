import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


import Home from './pages/Home.js';
import UserSignup from './pages/UserSignup.js'; 
import UserLogin from './pages/UserLogin.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserSignup" element={<UserSignup />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
