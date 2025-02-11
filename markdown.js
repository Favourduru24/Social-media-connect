// import React from 'react'
//  import  MDEditor from  '@uiw/react-md-editor'
//  import { useState } from 'react'
 
//  const Feed = () => {
//    const [pitch, setPitch] = useState('')
//    return (
//      <div data-color-mode="light" className='w-[30rem]'>
//      <MDEditor 
//      preview='edit'
//      id="pitch"
//      onChange={(value) => setPitch(value)}
//      height={300}
//      width={300}
//      value={pitch}
//      style={{borderRadius: 20, overflow: 'hidden'}}
//      previewOptions={{disalloedElement: ['style'], }}
//      textareaProps={{
//       placeholder:
//       "hat on your mind"
//      }}
//      />
//      </div>
//    )
//  }
 
//  export default Feed

const update = multer.diskStorage({
    destination:(req, file, cb) => {
    cb(null, 'public/images')        
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
  })
  
  const upload = multer({storage: update})
  
   app.patch("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
    // res.console.log(req.file)
   })

//     "Motivation Monday" 💪⛅
// Believe you can and you're halfway there! ⭐
// What's you're goal for the week? Share with me in the comments below 💬
// Let's crush this week and make it an amazing one🎉⚡
// #Motivation Monday 
  
// Hi guy ✋🤘🤙 Yah don't really now where to start cause like my heart i on fire me making a social media application is like one of my biggest project through the year and am happy cause it has been amazing working daily it been great and my advice to any upcoming developer it that you do your best 🤑🤑🤑