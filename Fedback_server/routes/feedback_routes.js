const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// POST /feedback - Submit feedback
router.post('/', async (req, res) => {
  const { username, email, feedbackText } = req.body;

  if (!username || !email || !feedbackText) {
    return res.status(400).json({ error: 'Username, email, and feedback text are required.' });
  }

  try {
    const newFeedback = new Feedback({ username, email, feedbackText });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully.', feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ error: 'Error saving feedback.' });
  }
});

// GET /feedback - Fetch all feedback
router.get('/', async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ timestamp: -1 }); // Newest first
    res.status(200).json({ feedback: feedbackList });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching feedback.' });
  }
});

// GET /feedback/:id - Fetch particular feedback
router.get('/:id', async (req, res) => {
  const feedbackId = req.params.id;

  try {
    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found.' });
    }

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching feedback by ID.' });
  }
});

// DELETE /feedback/:id - Delete partiuclar feedback
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting feedback' });
  }
});

module.exports = router;
