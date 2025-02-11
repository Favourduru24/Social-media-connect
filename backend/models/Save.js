const mongoose = require('mongoose')

const saveFeedSchema = new mongoose.Schema({
    description: {
        type: String
    },
    feedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feed'
    },
    userId: {
        type: String,
        ref: 'User'
    }
},
{
    timestamps: true
})  

  module.exports = mongoose.model('Save', saveFeedSchema)
