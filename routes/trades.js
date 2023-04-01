const express = require('express');
const { createTrade, getAllTrades, getTradeById, notAllowed } = require('../controllers/trades');
const auth = require('../middlewares/auth');
const tradeRoutes = express()

tradeRoutes.post('/', auth, createTrade);
tradeRoutes.get('/', auth, getAllTrades);
tradeRoutes.get('/:id', auth, getTradeById);
tradeRoutes.all('/:id', notAllowed);

module.exports = tradeRoutes;