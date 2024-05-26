const mongoose = require('mongoose')
const colors = require('colors')


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connecting to database ${mongoose.connection.host}`.bgCyan.white)
    } catch (error) {
        console.log(`Error in connection DB ${error}`.bgRed.white)
        
    }
}
module.exports = connectDB