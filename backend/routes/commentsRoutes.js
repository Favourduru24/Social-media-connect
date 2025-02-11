const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')

 router.post('/:postId/createComment', commentsController.postComment)
 
 router.get('/:postId/comments', commentsController.getComment)
router.put('/:commentId/reply', commentsController.addCommentReply)

   module.exports = router;