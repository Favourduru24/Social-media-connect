// const User = require('../models/User')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// const login = async(req, res) => {
//     try {
//          const {email, password } = req.body

//          if(!email || !password){
//             res.status(400).json({message: 'All Field Are Required.'})
//          }
          
//          const foundUser = await User.findOne({ email}).exec()

//           if(!foundUser){

//             return res.status(401).json({message: 'UnAuthorized.'})
//           }
//           const match = bcrypt.compare(password, foundUser.password)

//           if(!match) return res.status(401).json({message: 'UnAuthorized'})

//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         email: foundUser.email,
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,  
//                 {expiresIn: '10s'}

//             )

//             const refreshToken = jwt.sign(
//                  {
//                     "UserInfo":{
//                         email: foundUser.email
//                     }
//                  },
//                  process.env.REFRESH_TOKEN_SECRET,
//                  {expiresIn: '1d'}
//             )

//             res.cookie('jwt', refreshToken, {
//                 httpOnly:true,
//                 secure: true,
//                 sameSite: 'None',
//                 maxAge: 7 * 24 * 60 * 60 * 1000
//             })

//             res.json({accessToken})

//     } catch (error) {
//         console.log(error.message) 
//     }
// }

// const refresh = (req, res) => {
    // const cookies = req.cookies

    // if(!cookies?.jwt) return res.status(401).json({message: 'UnAuthorize'})

    // const refreshToken = cookies.jwt

//     const cookies = req.cookies

//     if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

//     const refreshToken = cookies.jwt
//     try {
//      jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         async (err, decoded) => {
//              if(err) return res.status(403).json({message: 'Forbidden'})
           
//          const foundUser = await User.findOne({email: decoded.email})

//          if(!foundUser) return res.status(401).json({message: 'UnAutherised'})

//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo":{
//                         email:foundUser.email
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 {expiresIn: '10s'}
//             )
//              res.json({accessToken})
//         })
//           } catch(error){
//      console.log(error)
//           }
//         }

// const logout = (req, res) => {
//     const cookies = req.cookies

//     if(!cookies?.jwt) return res.sendStatus(204)

//         res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'None',})

//         res.json({message: 'Cookies cleared'})
// }

// module.exports = {login, refresh, logout}


// const User = require('../models/User')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const asyncHandler = require('express-async-handler')


// // @desc Login
// // @route POST /auth
// // @access Public
// const login = asyncHandler(async (req, res) => {
    
//     const {password , email} = req.body

//    if (!password || !email) {
//         return res.status(400).json({ message: 'All fields are required' })
//     }

//     const foundUser = await User.findOne({ email }).exec()

//     if (!foundUser) {
//         return res.status(401).json({ message: 'Unauthorized' })
//     }

//     const match = await bcrypt.compare(password, foundUser.password)

//     if (!match) return res.status(401).json({ message: 'Unauthorized' })

//     const accessToken = jwt.sign(
//         {
//             "UserInfo": {
//                 "email": foundUser.email,
//             }
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: '10s' }
//     )

//     const refreshToken = jwt.sign(
//         { "email": foundUser.email },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: '20s' }
//     )

//     // Create secure cookie with refresh token 
//     res.cookie('jwt', refreshToken, {
//         httpOnly: true, //accessible only by web server 
//         secure: true, //https
//         sameSite: 'None', //cross-site cookie 
//         maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
//     })

//     // Send accessToken containing username and roles 
//     res.json({ accessToken })
// })

// // @desc Refresh
// // @route GET /auth/refresh
// // @access Public - because access token has expired
// const refresh = (req, res) => {
//     const cookies = req.cookies

//     if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

//     const refreshToken = cookies.jwt

//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         async (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidde' })

//             const foundUser = await User.findOne({ email: decoded.email }).exec()

//             if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "username": foundUser.email,
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '10s' }
//             )

//             res.json({ accessToken })
//         }
//     )
// }


// //@desc Logout
// //@route POST /auth/logout
// //@access Public - just to clear cookie if exists
// const logout = (req, res) => {
//     const cookies = req.cookies
//     if (!cookies?.jwt) return res.sendStatus(204) //No content
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})  
//     res.json({ message: 'Cookie cleared' })
// }

// module.exports = {
//     login,
//     refresh,
//     logout
// }

//Working version...

const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ email }).exec()

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                        "id": foundUser?.id,
                        "firstname": foundUser.firstname,
                         "lastname": foundUser.lastname,
                         "email": foundUser.email,
                         "address": foundUser.address,
                         "bio": foundUser.bio,
                         "work": foundUser.work,
                         "school": foundUser.school,
                          "relationship": foundUser.relationship,
                          "birthday":foundUser.birthday,
                          "profile": foundUser.profile,
                          "Cover": foundUser.Cover
                    }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ email: decoded.email}).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id":foundUser.id,
                        "firstname": foundUser.firstname,
                         "lastname": foundUser.lastname,
                         "email": foundUser.email,
                         "address": foundUser.address,
                         "bio": foundUser.bio,
                         "work": foundUser.work,
                         "school": foundUser.school,
                          "relationship": foundUser.relationship,
                          "birthday":foundUser.birthday,
                          "profile": foundUser.profile,
                          "Cover": foundUser.Cover
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {
    login,
    refresh,
    logout
}