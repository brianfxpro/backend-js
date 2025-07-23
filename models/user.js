const mongoose = require('mongoose');

// This is our Schema (the blueprint for a user)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // This field must be provided
    },
    email: {
        type: String,
        required: true,
        unique: true   // No two users can have the same email
    },
    password: {
        type: String,
        required: true
    }
});

// This creates our Model (the factory) based on the Schema
const User = mongoose.model('User', userSchema);

// This exports the Model so we can use it in other files
module.exports = User;