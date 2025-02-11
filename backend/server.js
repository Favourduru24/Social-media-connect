 const multer = require('multer')
 const express = require('express')
 const app = express()

  const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/images')
      },
      filename:(req, file, cb) => {
        cb(null, Date.now() + file.originalname)
      }
  })
    
  const upload = multer({storage: storage})

   app.post('/api/upload', (req, res) => {
      const file = req.file
       return res.status(200).json(req.file)
   })