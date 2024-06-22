// Assuming you have a basic Express server running on localhost:5000

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Example user for demonstration purposes (replace with your actual user authentication logic)
const users = [
  { id: 1, email: 'user@test.com', password: 'password123' }
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email and password (replace with actual database lookup or authentication logic)
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // For simplicity, send a success response with user details (in real app, generate and send a JWT token)
    res.status(200).json({ id: user.id, email: user.email });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
