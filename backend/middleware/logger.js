 const {format} = require('date-fns')
 const {v4: uuid} = require('uuid')
 const path = require('path')
 const fs = require('fs')
 const fsPromises = require('fs').promises



 const logEvent = async (message, logName) => {

    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logging = `{${dateTime}\t${uuid()}\t${message}}\n`

    try{
  if(!fs.existsSync(path.join(__dirname, '..', 'views'))){
    await fsPromises.mkdir(path.join(__dirname, '..', 'views'))
  } 
   await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logging)
  
    }catch(err){
    console.log(err)
    }
 }

 const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    next()
 }

 module.exports = {logger, logEvent}