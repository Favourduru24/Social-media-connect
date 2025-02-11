import Conversation from "../models/Conversation"

const createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId]
  })

   try {
      const saveConversation = await newConversation.save()

      res.status(200).json(saveConversation)
   } catch (err) {
      res.status(500).json(err)
   }
}  

 const getConversation = (req, res) => {
     
 } 

module.exports = {createConversation, getConversation }