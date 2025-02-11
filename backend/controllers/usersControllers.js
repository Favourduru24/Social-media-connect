const Feed = require('../models/Feed')
const FriendRequest = require('../models/FriendRequest')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


const getAllUser =  ( async (req, res) => {
    try {
       const user = await User.find().select('-password').lean().sort({ createdAt: 'desc'})

       if(!user?.length){
      res.status(404).json({message: 'No User Found'})
       }
        res.json(user)
    } catch (error) {
        console.log(error)
    }
    
})
const createNewUser = async (req, res) => {
 const { firstname, lastname, email, password, address, bio, work, school, relationship, birthday, profile, Cover, userId} = req.body

 try{
    if(!firstname || !lastname || !email ){
        return res.status(400).json({message: 'All Field Are Required.'})
     }
      const duplicate = await User.findOne({email}).lean().exec()
    
      if(duplicate){
        return res.status(400).json({message: 'Duplicate Email Address'})
      }
    
      const hashPassword = await bcrypt.hash(password, 10)
          
      const userArray = {firstname, lastname, email, "password": hashPassword, address, bio, work, school, relationship, birthday, profile, Cover, userId}
       
      const user = await User.create(userArray)

      if(user){
        return res.status(200).json({message: `New user ${email} created`})
      } else{
        return res.status(400).json({message: 'Invalid user data received.'})
      }

 } catch (error) {
    console.log(error)
 }

 
}
const updateUser = async(req, res) => {
    const {id, firstname, lastname, email, password, address, bio, work, school, relationship, birthday, profile, Cover} = req.body  
    
    if(!id|| !firstname || !lastname || !email){
        return res.status(400).json({message: 'Fill the required feild.'})
    }

    const user = await User.findById(id).exec()

    if(!user) {
      return res.status(404).json({message: 'No User Found.'})
    }

    const duplicate = await User.findOne({email}).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id){
      return res.status(409).json({message: 'No matching User Id'})
    }

    user.firstname = firstname
    user.lastname = lastname
    user.email = email
    user.address = address
    user.bio = bio
    user.work = work
    user.school = school
    user.relationship = relationship
    user.birthday = birthday
    user.profile= profile
    user.Cover = Cover

    if(password) {
      user.password = await bcrypt.hash(password, 10)
    }

   const updated = await user.save()
   res.json({message: `${updated.firstname} updated`})
}

const deleteUser = async (req, res) => {
  const {id} = req.body

  if(!id) {
    return res.status(400).json({message: 'User ID Not Found'})
  }

    const user = await User.findById(id).exec()

    if(!user){
      return res.status({message: 'User Not Found'})
    }

    const deleteUser = await user.deleteOne()

     const reply = `user ${deleteUser.firstname} ${deleteUser._id} deleted`

      res.json(reply)
}

const populateUser = (query) => {
  return query

  .populate({path: 'friendRequest', model: User, select: 'profile lastname firstname email'})
  .populate({path: 'follower', model: User, select: 'profile lastname firstname email'})
  .populate({path: 'following', model: User, select: 'profile lastname firstname email'})
}

   const userDetail = async (req, res) => {
    try{

      const id = req.params.id 
     
      const user = await populateUser(User.findById(id)).populate('feeds')
       
      if(!user) {
       return res.status(404).json({message: 'User not Found.'})
      }
         res.json(user)
 //  const post = await Feed.find({userId: id})
         
      //  console.log(user.feeds)

    }catch(error) {
    console.log(error)
     res.status(500).json({ message: 'Internal Server error' })
    }
   
   }
 
    const followUser = async (req, res) => {

         const id = req.params.id
         const followerId = req.id

          const user = await User.findById(id)

          if(!user) {
            return res.status(404).send('No User Found.')
          }

           const followers = await User.findById(followerId)
            
           if(!followers) {
            return res.status(404).send('Follwer not found.')
           }
               
           user.follower.push(followerId)
           await user.save()


           followers.following.push(id)
            await followers.save()

            res.send('User followed successfuly.')
          
    }
      
    const unFollowUser = async  (req, res) => {
     const id = req.params.id
     const followerId = req.id

      const user = await User.findById(id)

      console.log(req.id)

      if(!user) {
        return res.status(404).send('User not found.')
      }

      const followers = await User.findById(followerId)

      if(!followers) {
        return res.status(404).send('Follower not found.')
      }

       user.follower.pull(followerId)
       await user.save()

        followers.following.pull(id)
        await followers.save()



        res.send('User unfollowed successfullly')
        
    }

 
    

               
 module.exports = { getAllUser, createNewUser, updateUser, deleteUser, userDetail, followUser, unFollowUser,
 }


