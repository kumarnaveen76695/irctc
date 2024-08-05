// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json

// Example user data store
const users = [];

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  // Add user to the data store (you would typically save this to a database)
  users.push({ username, email, password });
  res.status(201).send({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
