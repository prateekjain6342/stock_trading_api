const { default: mongoose } = require("mongoose");

const User = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        id: {
            type: Number
        }
    }
, {timestamps: true});

module.exports = mongoose.model('User', User);