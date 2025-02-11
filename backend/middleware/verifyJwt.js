const jwt = require('jsonwebtoken')

const verifyJwt = (req, res, next) => {
 const authHeader = req.headers.authorization || req.headers.Authorization

 if(!authHeader?.startsWith('Bearer ')){
    return res.status(401).json({message: 'Unauthorized'})
 }
  const token = authHeader.split(' ')[1]

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        if(err) return res.status(403).json({message: 'Forbidden'}) 

            req.id = decoded.UserInfo.id
            req.firstname = decoded.UserInfo.firstname
            req.lastname = decoded.UserInfo.lastname
            req.email = decoded.UserInfo.email
            req.address = decoded.UserInfo.address
            req.bio = decoded.UserInfo.bio
            req.work = decoded.UserInfo.work
            req.school = decoded.UserInfo.school  
            req.relationship = decoded.UserInfo.relationship
            req.birthday = decoded.UserInfo.birthday
            req.profile = decoded.UserInfo.profile
            req.Cover = decoded.UserInfo.Cover
        next()
    }
  )
}

module.exports = verifyJwt