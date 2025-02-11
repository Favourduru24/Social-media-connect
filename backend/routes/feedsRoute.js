const express = require('express')
const router = express.Router()
const feedsController = require('../controllers/feedsController')
 
const verifyJwt = require('../middleware/verifyJwt')



router.route('/')
.get(feedsController.getAllFeed)
.post(feedsController.createNewFeed)
.patch(feedsController.updateFeed)
.delete(feedsController.deleteFeed)


router.get('/:id', feedsController.getFeed)
router.get('/user/:id',   feedsController.getUserFeed)
router.put('/like/:id', verifyJwt, feedsController.likeFeed)

module.exports = router
  