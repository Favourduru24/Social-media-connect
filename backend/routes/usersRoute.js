const express = require('express') 
const router = express.Router()
const userController = require('../controllers/usersControllers')
const verifyJwt = require('../middleware/verifyJwt')

// router.use(verifyJwt)


router.route('/')
.get(verifyJwt,userController.getAllUser)
.post(userController.createNewUser)
.patch(verifyJwt, userController.updateUser) 
.delete(userController.deleteUser)

router.get('/:id', userController.userDetail)
router.put('/follow/:id', verifyJwt, userController.followUser )
router.put('/unfollow/:id', verifyJwt, userController.unFollowUser)



module.exports = router


 