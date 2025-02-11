const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feed'
    }
})

 module.exports = mongoose.model('Category', categorySchema)