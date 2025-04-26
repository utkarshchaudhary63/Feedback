import React from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';
import './App.css';

function App() {
  return (
    <div className="page-container">
      <div className="left-panel">
        <FeedbackForm />
      </div>
      <div className="right-panel">
        <FeedbackDashboard />
      </div>
    </div>
  );
}

export default App;
