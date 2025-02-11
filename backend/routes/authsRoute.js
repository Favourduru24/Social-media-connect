const express = require('express')
const router = express.Router()
const authsController = require('../controllers/authsController')
const loginLimiter = require('../middleware/loginLimiter')

router.route('/')
.post(loginLimiter, authsController.login)

 router.route('/refresh')
.get(authsController.refresh)

router.route('/logout')
.post(authsController.logout)
 
module.exports = router