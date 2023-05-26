const router = require('express').Router()
const authController = require('../controllers/auth.controller.js')

//router.get('/')
router.post("/register", authController.register)
router.post("/login", authController.login)

module.exports = router