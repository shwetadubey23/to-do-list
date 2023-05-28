const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const { connectDb } = require('./data/dataBase');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const cors = require('cors')

const app = express()

config({
    path: "./data/config.env"
})

// const dotenv = require('dotenv')
// dotenv.config()    we can use any one method to use config functionality

// using middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);

connectDb()

app.use('/', route)

app.listen(process.env.PORT, () => {
    console.log("Server Connected");
})