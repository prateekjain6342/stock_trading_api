const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Fields Validation
        const doc = {
            email: email,
            password: password
        }

        await User.validate(doc);

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
        const access_token = jwt.sign({email: result.email, id: result._id}, process.env.ACCESS_SECRET_KEY, {expiresIn: 60*10});
        const refresh_token = jwt.sign({email: result.email, id: result._id}, process.env.REFRESH_SECRET_KEY, {expiresIn: 60*60});

        res.status(201).json({
            status: true,
            user_email: result.email,
            access_token: access_token,
            refresh_token: refresh_token
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
        const access_token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.ACCESS_SECRET_KEY, {expiresIn: 60*10});
        const refresh_token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.REFRESH_SECRET_KEY, {expiresIn: 60*60});

        res.status(200).json({
            status: true,
            user_email: existingUser.email,
            access_token: access_token,
            refresh_token: refresh_token
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: error
        })
    }
}

const refreshToken = (req, res) => {

    let { refresh_token } = req.body;

    try {
        let user = jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY);
        const access_token = jwt.sign({email: user.email, id: user._id}, process.env.ACCESS_SECRET_KEY, {expiresIn: 60*10});
        refresh_token = jwt.sign({email: user.email, id: user._id}, process.env.REFRESH_SECRET_KEY, {expiresIn: 60*60});

        res.status(200).json({
            status: true,
            user_email: user.email,
            access_token: access_token,
            refresh_token: refresh_token
        });

    } catch(error) {
        res.status(401).json({
            status: false,
            message: error
        })
    }
}

module.exports = { signup, login, refreshToken };