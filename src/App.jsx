// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import ThreeScene from './components/ThreeScene';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shapes" element={<ThreeScene />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
