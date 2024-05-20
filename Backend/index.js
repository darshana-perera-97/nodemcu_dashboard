// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define another route for demonstration
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is your data.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
