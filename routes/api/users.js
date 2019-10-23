const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User Model
const User = require('../../models/User');

// Get req for item
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Simple Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ message: 'user already exist.' });

    // Create New User
    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt & hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (er, hash) => {
        if (er) throw er;
        newUser.password = hash;

        // Save User data to database
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
