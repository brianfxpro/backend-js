const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-super-secret-string-for-this-project';


router.post('/register', async (req, res) => {
    try {
        // 1. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // 2. Create a new user object
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword // IMPORTANT: Store the hashed password
        });

        // 3. Save the new user to the database
        const savedUser = await user.save();
        res.status(201).json({ user: savedUser._id }); // Send back a confirmation

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        // 1. Find the user by their email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // If user is not found, send error
            return res.status(400).json({ message: 'Email is not correct' });
        }

        // 2. Compare the submitted password with the stored hash
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            // If password doesn't match, send error
            return res.status(400).json({ message: 'Invalid password' });
        }

        // 3. If password is correct, create and assign a token
        const token = jwt.sign(
            { _id: user._id },    // Payload: data to store in the token
            JWT_SECRET,           // The secret key
            { expiresIn: '1h' }   // Options: set it to expire in 1 hour
        );

        // 4. Send the token back to the user
        res.json({ message: "Logged in successfully!", token: token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;