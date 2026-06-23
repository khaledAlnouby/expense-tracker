const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for testing
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Expense Tracker API' });
});

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
