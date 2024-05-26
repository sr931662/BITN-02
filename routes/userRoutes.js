const express = require("express")
const { registerController, loginController } = require("../controllers/userController")

// routes object
const router = express.Router()

// routes
router.post('/register', registerController)
router.post('/login', loginController)

module.exports = router