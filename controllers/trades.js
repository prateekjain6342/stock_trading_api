const Trade = require('../models/trades');

const createTrade = async (req, res) => {
    const { type, symbol, shares, price } = req.body;

    try {
        const doc = {
            type: type,
            user_id: req.userId,
            symbol: symbol,
            shares: shares,
            price: price
        }

        await Trade.validate(doc)

        const newTrade = await Trade.create(doc)

        res.status(201).json({
            status: true,
            message: 'Trade created',
            trade: newTrade
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: error
        })
    }
}

const getAllTrades = async (req, res) => {
    const { type, user_id } = req.query;

    let query = {}
    if (type || user_id) {
        if (type && user_id) {
            query.type = type
            query.user_id = user_id
        }

        if (type && !user_id) {
            query.type = type
        }

        if (!type && user_id) {
            query.user_id = user_id
        }
    }

    const trades = await Trade.find(query);
    res.status(200).json({
        status: true,
        body: trades
    })
}

const getTradeById = async (req, res) => {
    const tradeId = req.params.id;
    const trade = await Trade.findById(tradeId)
    
    if (trade) {
        res.status(200).json({
            status: true,
            body: trade
        })
    } else {
        res.status(404).json({
            status: false,
            message: 'Trade Not Found'
        })
    }
    
}

const notAllowed = async (req, res) => {
    res.status(405).json({
        status: false,
        message: 'Method Not Allowed'
    })
}

module.exports = { createTrade, getAllTrades, getTradeById, notAllowed };