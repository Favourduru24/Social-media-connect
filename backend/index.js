require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const path = require('path')
const {logger} = require('./middleware/logger')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const corsOption = require('./config/corsOption')
const credentials = require('./middleware/credentials')
// const errHandler = require('./middleware/errHandler')
const app = express()


 app.use(credentials)
   
app.use(cors(corsOption))
 
console.log(process.env.NODE_ENV)

app.use(logger)

connectDB()

 
 app.use(express.json())
 app.use(express.static('public'))
 app.use(cookieParser())

 app.use('/', require('./routes/root'))
 app.use('/users', require('./routes/usersRoute'))
 app.use('/feeds', require('./routes/feedsRoute'))
 app.use('/save', require('./routes/saveRoute'))
 app.use('/auth', require('./routes/authsRoute'))
 app.use('/comment', require('./routes/commentsRoutes'))
 app.use('/friendrequest', require('./routes/requestRoute'))
//  app.use('/conversation', require('./routes/conversationRoute'))


 const storage = multer.diskStorage({ 
  destination:(req, file, cb) => {
  cb(null, 'public/images')         
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({storage: storage})

 app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
  // res.console.log(req.file)
 })

 const update = multer.diskStorage({
    destination:(req, file, cb) => {
    cb(null, 'public/images')        
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
  })
  
  const produce = multer({storage: update})
  
   app.patch("/api/upload", produce.single("file"), (req, res) => {
    const file = req.file 
    res.status(200).json(file.filename)
    // res.console.log(req.file)
   })

    app.all("*", (req, res) => { 
      res.status(404)
     if(req.accepts('html')){
     res.sendFile(path.join(__dirname, 'views', 'index.html'))
     }
     else if(req.accepts('json')){
         res.json({message: 'Page Not Found'})
 
     }else{lter
         res.type('txt').send('404 Page Not Found')
     }
 })  
 

  //  app.use(errHandler)
     
 mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => console.log(`server runing on port ${PORT}`))
 })



