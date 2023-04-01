const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
         // Check for existing user
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: 'User already exists'
            })
        }

        // Hashing the Password
        const hashedPassword = await bcrypt.hash(password, 15);

        // User Creation
        const result = await User.create({
            email: email,
            password: hashedPassword
        })

        // Token Generation
        const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET_KEY);
        res.status(201).json({
            status: true,
            user_email: result.email,
            token: token
        });


    } catch(error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: error
        })
    }

    
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
         // Check for existing user
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: 'User not found'
            })
        }

        // Decrypt Password
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({
                status: false,
                message: 'Wrong email/password'
            })
        }

        // Generate Password
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET_KEY);
        res.status(200).json({
            status: true,
            user_email: existingUser.email,
            token: token
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

module.exports = { signup, login };