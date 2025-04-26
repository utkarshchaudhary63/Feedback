import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    feedbackText: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/feedback', formData);
      console.log(response.data);
      setSuccessMessage('Feedback submitted successfully!');
      setFormData({ username: '', email: '', feedbackText: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder="Your Name" 
          value={formData.username}
          onChange={handleChange}
          required
        /><br /><br />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email}
          onChange={handleChange}
          required
        /><br /><br />
        <textarea 
          name="feedbackText" 
          placeholder="Your Feedback" 
          value={formData.feedbackText}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
