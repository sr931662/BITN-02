const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add full name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'please add email'],
        unique: true,
        trim: true
    },
    pass: {
        type: String,
        required: [true, 'please add password'],
        min: 8,
        max: 64
    },
    role: {
        type: String,
        default: 'user'
    }
},
{ timestamps: true }
)

module.exports = mongoose.model("User", userSchema)