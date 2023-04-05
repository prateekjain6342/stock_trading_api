const { default: mongoose } = require("mongoose");

const User = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            validate: {
                validator: (value) => {
                    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    return emailRegex.test(value);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        password: {
            type: String,
            required: true
        }
    }
, {timestamps: true});

module.exports = mongoose.model('User', User);