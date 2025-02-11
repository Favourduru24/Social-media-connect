const Feed = require('../models/Feed')
const Save = require('../models/Save')
const User = require('../models/User')

const getAllFeed = async (req, res) => {
     try {
        const feed = await Feed.find().populate('creator').lean()

        if(!feed?.length){
            return res.status(404).json({message: 'No Feed Found'})
        }

   //      const feedWithUser = await Promise.all(feed.map(async (feed) => {
   //    const user = await User.findById(feed.user).lean().exec()
   //    return {...feed, firstname:user.firstname}
   //  }))

        return res.json(feed)

     } catch (error) {
        console.log(error)
     }
}
const createNewFeed = async (req, res) => {
  try{

    const {feedUrl, feedDetail ,userProfile, firstName, lastName, userId } = req.body
     
     if(!feedUrl || !feedDetail){
        return res.status(409).json({message: 'All Feild Are Required.'})
     }
      
     const feed = await Feed.create({feedUrl, feedDetail, userProfile, firstName, lastName, creator: userId})

     if(feed) {
        return res.status(200).json({message: 'Your Feed Has Just Been Created.'})
     } else{
        return res.status(400).json({message: 'Invalid Data sent.'})
     }
   
  }catch(error){
      console.log(error)
  }
}
const updateFeed = async (req, res) => {
    try {
    const {id, feedUrl, feedDetail} = req.body

    if(!id || !feedUrl || !feedDetail) {
         return res.status(400).json({message: 'All Feild Are Required'})
    }

      const feed = await Feed.findById(id).exec()

      const duplicate = await Feed.findOne({id}).lean().exec()

      if(duplicate &&  duplicate?._id.toString() !== id){
      return res.status(400).json({message: 'No Feed ID'})
      }
       
      feed.feedUrl = feedUrl,
      feed.feedDetail= feedDetail 

      const updated = await feed.save()

     
        res.json({message: `Feed ${feed.id} has been updated`})
     
    } catch (error) {
        console.log(error)
    }
}
const deleteFeed = async (req, res) => {

   try{

      const {id} = req.body

      if(!id){
         return res.status(400).json({message: 'Feed ID required'})
      }
 
      const feed = await Feed.findById(id).exec()
       
      if(!feed){
         return res.status(409).json({message: 'Feed Not found'})
      }
 
      const deleteIt = await feed.deleteOne()
 
      const reply = `Feed ${deleteIt._id} has been deleted`
 
      res.json(reply)
   }catch(error) {
      console.log(error)
   }
   
}

   const getFeed = async (req , res ) => {
      
      try{

      if(req.params?.id) {
         const feed = await Feed.findById(req.params?.id)
         res.json(feed)
      }else {
         res.status(500).json({message: 'No Post Found'})
      }

      }catch(error){
      res.status(500).json({message: `Getting single feed failed`, error: error.message})
    console.log(error)


   }
   }
   
    const getUserFeed = async (req, res) => {
       try {
          
          
       const feeds = await Feed.find({creator: req.params.id}).populate('creator')
  
        res.json(feeds)        
       
      } catch (error) {
           console.log(error)
           
           res.status(500).json({message: 'Internal server error.'})
       }
       
    }

     const likeFeed = async (req, res) => {

       const Id = req.params.id
       const userId = req.id

       const post = await Feed.findById(Id)

        if(post.likes.includes(userId)) {
           post.likes.pull(userId)
        } else {
         post.likes.push(userId)
        }

        await post.save()

         res.status(200).json({message: 'Like Is Successful.'})
     } 
      
    
     
module.exports = {getAllFeed, createNewFeed, updateFeed, deleteFeed, likeFeed, getFeed, getUserFeed, likeFeed}