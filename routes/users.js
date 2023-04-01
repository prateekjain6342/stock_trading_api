const express = require('express');
const { signup, login, refreshToken } = require('../controllers/users');
const userRoutes = express()

userRoutes.post('/signup', signup)

userRoutes.post('/login', login)

userRoutes.post('/refresh-token', refreshToken)

module.exports = userRoutes;