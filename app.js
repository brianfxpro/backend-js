const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const userRoutes = require('./routes/users'); // Import the user routes
const authRoutes = require('./routes/auth'); // Add this line


const connectionString = "mongodb+srv://brian:qvaAnXZ1xpTouSOo@briancluster.emrjexu.mongodb.net/?retryWrites=true&w=majority&appName=BrianCluster"


mongoose.connect(connectionString)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('Connection error', err));


// Middleware to parse JSON
app.use(express.json());

// Main entry point for all user-related routes
app.use('/api/users', userRoutes);

// Main entry point for authentication routes
app.use('/api/auth', authRoutes); // Add this line


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});