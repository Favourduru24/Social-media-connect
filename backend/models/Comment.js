const mongoose = require('mongoose')
const User = require('./Feed') 
const Feed = require('./Feed')

 const commentSchema = new mongoose.Schema({
      text: {
       type: String,
       required:true
        },
       postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Feed',
        required: true
       },
       reply:[{
         firstname: {
           type: String,
        },
        lastName: {
      type: String
        },
        commentId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        reply: {
          type: String,
        },
        createdAt: {
           type: Date,
            default: new Date().getTime() 
        }
      }],
 },
 {
    timestamps: true
 }
)

 module.exports = mongoose.model('Comment', commentSchema)