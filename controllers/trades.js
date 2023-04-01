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

module.exports = { createTrade };