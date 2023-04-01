const express = require('express')
const { default: mongoose } = require('mongoose')
const tradeRoutes = require('./routes/trades')
const userRoutes = require('./routes/users')
const app = express()
const port = 3000
require('dotenv').config();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/trade', tradeRoutes);


app.get('/health', (req, res) => {
    console.log('Services are running fine')
    res.status(200).json({
        'status': true,
        'message': 'Backend Services are running.'
    })
})

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {

    app.listen(port, () => {
        console.log(`Server started on port: ${port}`)
    })

}).catch((error) => {

    console.log(error);

})

