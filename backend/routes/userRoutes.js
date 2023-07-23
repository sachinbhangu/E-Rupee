// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to create a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, balance } = req.body;
    const newUser = new User({ name, email, password, balance });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Route to get a single user by ID
router.get('/users/:email', async (req, res) => {
  try {
    const emailId = req.params.email;
    const user = await User.findById(emailId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Route to update a user's balance by ID
router.patch('/users/:email', async (req, res) => {
  try {
    const emailId = req.params.email;
    const { balance } = req.body;
    const updatedUser = await User.findByIdAndUpdate(emaild, { balance }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Route to delete a user by ID
router.delete('/users/email', async (req, res) => {
  try {
    const emailId = req.params.email;
    const deletedUser = await User.findByIdAndRemove(emailId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
