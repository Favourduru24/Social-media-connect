const express = require('express')
const router = express.Router()
const verifyJwt = require('../middleware/verifyJwt')
const saveController = require('../controllers/saveController')
router.route('/')
.post(verifyJwt, saveController.saveFeed)
.get(verifyJwt, saveController.getSaveFeed)

module.exports = router