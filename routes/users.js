const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Find all users in the database
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });
  try {
    const newUser = await user.save(); // Save the new user to the database
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT - Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;