// const Feed = require('../models/Feed')
const Comment = require('../models/Comment')

const postComment = async (req, res) => {

  const id = req.params?.postId

  const  {text}  = req.body

  //  console.log({text})
  try { 

      if(id) {
        const comment = await  Comment.create({
          text,
          postId: id
        })
          res.json(comment)
      } else {
        return res.status(404).json({message: 'Post Id required..'})
      }
       
  } catch (error) {
     console.log(error)
    //  res.status(500).json({message: 'Internal Server Error'})
  }
}

const getComment = async (req, res) => {

  const id = req.params?.postId

 try {

   if(id) {  
    const comments = await Comment.find({postId: id }).sort({ createdAt: 'desc'})

    res.json(comments)
    }else{
      res.status(404).json({message: 'No Comment Found'})
    }

    
 } catch (error) {
    console.log(error)
    // res.status(500).json({message: 'Internal Server Error'})
 }
}

 const addCommentReply = async () => {
    const comment_id = req.params.commentId
        
    try {
      if(comment_id) {

        const replies = {
              commentId: comment_id,
               firstname,
               lastname,
               reply: req.body.reply
        }
         
        const newComment = await Comment.findByIdAndUpdate({_id: comment_id}, {$push: {reply: replies}}, { new: true})
         
         res.json(newComment)
      }else {
        res.status(404).json({message: 'Comment with this postId not found.'}) 
           }
    } catch (error) {
       res.status(404).json({message: 'Error creating repy.'})
    }
 }

  
 
 module.exports = {postComment, getComment, addCommentReply}