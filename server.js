const express = require('express')
const cors = require("cors")
const dotenv = require("dotenv")
const colors = require("colors")
const morgan = require("morgan")
const { default: mongoose } = require('mongoose')
const connectDB = require('./config/db')

// dotenv
dotenv.config()

// database configuration
connectDB()

//  Rest Object [RESTAPI]
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// ROUTES
app.use('/api/v1/auth', require('./routes/userRoutes'))

// Home
// app.get("/", (req,res)=>{
//   res.status(200).send({
//     "success":true,
//     "msg":"Node Serevr Running"
//   })
// })

// PORT
const PORT = process.env.PORT || 8080

// Listen
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`.bgGreen.white)
})
