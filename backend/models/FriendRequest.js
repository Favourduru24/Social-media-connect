const mongoose = require('mongoose')

 const friendRequestSchema = new mongoose.Schema({
    sender: {
        type: String,
        ref: 'User'
    },
    receiver: {
        type:  String,
        ref: 'User'
    },
     status: {
        type: String, enum: ['pending', 'accepted', 'rejected'],
     }
  },
  {
    timestamps: true
  }
)
  
 module.exports = mongoose.model('FriendRequest', friendRequestSchema)