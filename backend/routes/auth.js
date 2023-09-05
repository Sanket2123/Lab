// routes/auth.js
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword
    });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  })
);

router.get('/success', (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'Login failed' });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
