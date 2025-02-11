const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId:{
      type: String  
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    bio:{
        type:String
    },
    work:{
        type:String
    },
    school:{
      type:String 
    },
    relationship:{
        type:String 
    },
    birthday:{
        type:String
    },
    profile:{
        type:String
    },
    feeds: [{
        type: mongoose.Schema.Types.ObjectId,
    ref:'Feed' 
    }],       
 
    follower: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
         }],
    
    following : [{
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User'
        }],
   
    Cover:{
        type:String
    },
    friendRequest:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friend:[{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
    }]
},
  
{
    timestamps:true
}
)

 module.exports = mongoose.model('User', userSchema)