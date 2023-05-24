const express = require("express");
require('dotenv').config()
const cors = require('cors')
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors(corsOptions));

const authRoute = require('./routes/auth.route.js')
const hotelRoute = require('./routes/hotel.route.js')
const userRoute = require('./routes/user.route.js')
const roomRoute = require('./routes/rooms.route.js')


app.use('/auth', authRoute)
app.use('/hotel', hotelRoute)
app.use('/rooms', roomRoute)
app.use('/user', userRoute)

require('./database')
app.listen(process.env.PORT_NUMBER, () => {
    console.log("server is listening...")
})


app.get('/health', (req, res) => {
    return res.json({
        "status": 200,
        "message": "server is up"
    }).status(200)
})