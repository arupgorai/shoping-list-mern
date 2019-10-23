const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User Model
const User = require('../../models/User');

// Get req for item
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ message: 'user does not exist.' });

    // Validate password
    bcrypt
      .compare(password.toString(), user.password)
      .then(match => {
        if (!match)
          return res.status(400).json({ message: 'Invalid Credientail' });

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
      })
      .catch(e => console.log('Err =>', e));
  });
});

module.exports = router;
