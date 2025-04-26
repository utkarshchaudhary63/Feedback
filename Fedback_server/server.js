const express = require('express');
const mongoose = require('mongoose');
const feedbackRoutes = require('./routes/feedback_routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow cors 
const cors = require('cors');
app.use(cors());


// Middleware
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://utkarshchaudhary63:RorZlP2VrawVlFGd@cluster0.u7mwvnm.mongodb.net/feedbackDB?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Atlas connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/feedback', feedbackRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
