const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requestController')
const verifyJwt = require('../middleware/verifyJwt')

 router.route('/')
    .get(verifyJwt, requestController.getFriendRequest)
    .post(verifyJwt,  requestController.sendFriendRequest)
    
    router.put('/:friendRequestId', verifyJwt, requestController.acceptFriendRequest)

 module.exports = router