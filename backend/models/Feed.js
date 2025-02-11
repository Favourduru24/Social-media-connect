const mongoose = require('mongoose')
// import User from './User'

 const feedsSchema = new mongoose.Schema({
    feedUrl:{
        type:String,
        required:true
    },
     comment:{
        type: mongoose.Schema.Types.ObjectId,
          ref:'Comment'
     },
     feedDetail: {
        type: String,
        required: true
     },
    firstName:{ 
        type:String
     },
     lastName:{
        type:String
     },
    userProfile:{
        type: String
     },
     creator: {
       type: String,
       ref:'User'
     },
      likes: [{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      }]
 },
{
    timestamps:true
})
 
console.log('Feed model defined')

module.exports = mongoose.model('Feed', feedsSchema)

  