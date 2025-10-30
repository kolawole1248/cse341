const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send("Hello - API is working!");
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Users route with query parameters (example)
app.get('/api/users', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  
  res.json({ 
    message: 'Users route working!',
    page: parseInt(page),
    limit: parseInt(limit),
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});