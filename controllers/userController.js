const { hashPass, comparePass } = require('../helpers/authHelper')
const userModel = require('../models/userModels')
const JWT = require("jsonwebtoken")


const registerController = async (req, res) => {
    try {
        const {name, email, pass} = req.body

        // validation
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'name is required'
            })
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'email is required'
            })
        }
        if (!pass || pass.length < 8) {
            return res.status(400).send({
                success: false,
                message: 'pass is required and more than 8 characters'
            })
        }


        // exisiting user
        const userExists = await userModel.findOne({email})
        if(userExists) {
            return res.status(500).send({
                success: false,
                message: "User already exists"
            })
        }
        
        // Hashed password
        const hashedPass = await hashPass(pass)

        const user = await userModel({name, email, pass:hashedPass}).save()
        return res.status(201).send({
            success: true,
            message: 'Registered successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in registration API",
            error
        })
    }
}

const loginController = async (req, res) => {
    try {
        const {email, pass} = req.body
        // validation
        if(!email || !pass) {
            return res.status(500).send({
                success: false,
                message:"Please provide Email or Password"
            })
        }
        const user = await userModel.findOne({email})

        if(!user) {
            return res.status(500).send({
                success: false,
                message: "User not found"
            })
        }
        
        // match password
        const match = await comparePass(pass, user.pass)

        if (!match) {
            return res.status(500).send({
                success:false,
                message: "Invalid Email or Password"
            })
        }

        // Token JWT
        const token = await JWT.sign({ _id:user._id }, process.env.SECRET_KEY, {
            expiresIn: '7d'
        })

        // undefining the password
        user.pass = undefined
        res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in login api",
            error
        })
    }
}

module.exports = { registerController, loginController }