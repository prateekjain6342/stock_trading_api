const express = require('express');
const { signup, login } = require('../controllers/users');
const userRoutes = express()

userRoutes.post('/signup', signup)

userRoutes.post('/login', login)

module.exports = userRoutes;