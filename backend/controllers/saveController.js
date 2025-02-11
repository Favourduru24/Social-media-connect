const Save = require("../models/Save")

 const saveFeed = async (req, res) => {
        
       try {
           const {feedId, description, userId } = req.body

            if(!feedId || !description || !userId) {
               return res.status(404).json({message: 'All field are required.'})
            }

            const save = await Save.create({feedId, description, userId})

            if(save){
               return res.status(200).json({message: 'Your Feed have been saved.'})
            }else {
               return res.status(400).json({message: 'Invalid data recieved.'})
            }
       } catch (error) {
          console.log(error)
       }  
     } 

     const getSaveFeed = async (req, res) => {
        try {
           const id = req.id

        const save = await Save.find({userId: id}).populate('feedId')
        

        res.json(save)

        } catch (error) {
            console.log(error)
        }
     }


    module.exports = {saveFeed, getSaveFeed}