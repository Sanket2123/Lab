// app.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/sample', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes setup
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
