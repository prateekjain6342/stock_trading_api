const { default: mongoose } = require("mongoose");

const Trade = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    if (value == 'buy' || value == 'sell') {
                        return true
                    } else {
                        return false
                    }
                },
                message: props => `${props.value} is not a valid type!`
            }
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        symbol: {
            type: String,
            required: true
        },
        shares: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => {
                    if (value >= 1 && value <= 100) {
                        return true
                    } else {
                        return false
                    }
                },
                message: props => `${props.value} is not between the expected range of [1, 100]`
            }
        },
        price: {
            type: Number,
            required: true,
        }
    }
, {timestamps: true});

module.exports = mongoose.model('Trade', Trade);