import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackDashboard = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/feedback');
      setFeedbackList(response.data.feedback);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`);
      setFeedbackList(feedbackList.filter(feedback => feedback._id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const sortedFeedback = [...feedbackList].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else {
      return new Date(a.timestamp) - new Date(b.timestamp);
    }
  });

  return (
    <div>
      <h2>Feedback Dashboard</h2>
      <div className="sort-buttons">
        <button onClick={() => setSortOrder('newest')}>Newest First</button>
        <button onClick={() => setSortOrder('oldest')}>Oldest First</button>
      </div>

      {sortedFeedback.map((feedback) => (
        <div key={feedback._id} className="feedback-item">
          <h4>{feedback.username} ({feedback.email})</h4>
          <p>{feedback.feedbackText}</p>
          <small>{new Date(feedback.timestamp).toLocaleString()}</small>
          <br />
          <button onClick={() => handleDelete(feedback._id)} style={{ marginTop: '10px', backgroundColor: '#dc3545' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default FeedbackDashboard;
