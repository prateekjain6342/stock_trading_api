const express = require('express');
const { createTrade } = require('../controllers/trades');
const auth = require('../middlewares/auth');
const tradeRoutes = express()

tradeRoutes.post('/', auth, createTrade);

module.exports = tradeRoutes;