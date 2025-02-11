 const FriendRequest = require('../models/FriendRequest')
const User = require('../models/User')

   const sendFriendRequest = async (req, res) => {
           
     const {senderId, receiverId} = req.body 
         
       const existRequest = await FriendRequest.findOne({
         sender: senderId,
         receiver: receiverId
       })

        if(existRequest) {
          return res.status(400).json({message: 'Friend request sent already.'})
        }

         const createRequest = new FriendRequest({
           sender: senderId,
           receiver: receiverId

         })
     try {
      await createRequest.save()

      const popularFriendRequest = await FriendRequest.find(createRequest._id).populate('sender')

       res.send(popularFriendRequest)

      // res.status(200).json({message: 'Friend request sent successfully.'})

     } catch (error) {
       res.status(500).send('Error sending friend request.')
     } 
              }

      const getFriendRequest = async (req, res) => {
              try{
     
               const userId = req.id
                
               const getRequests =  await FriendRequest.find({receiver: userId}).populate('sender')
     
                res.send(getRequests)
              } catch (error) {
            console.log(error)
              }
              
          }
          const acceptFriendRequest = async (req, res) => {
        
            const friendRequestId = req.params.friendRequestId
  
             try {
              const acceptRequest =  await FriendRequest.findById(friendRequestId) 

              if(!acceptRequest) {
                return res.status(404).send('Friend request not found.')
              }
  
              acceptRequest.status = 'accepted'
  
              const senderId = await acceptRequest.sender
              const receiverId = await acceptRequest.receiver
  
              const send = await User.findById(senderId)
              const receive = await User.findById(receiverId)
  
                send.friendRequest.push(receiverId)
                receive.friendRequest.push(senderId)
  
               await send.save()
               await receive.save()
               await  acceptRequest.save()  
               res.send('Friend request accepted successfully')
              } catch (error) {
               res.status(500).send( 'Error accepting friend request.')
              }
              
               }         
  

    module.exports = {sendFriendRequest, getFriendRequest, acceptFriendRequest }
