// This file will  handles the promise error 

module.exports = func => (req,res,next)=>{
    return Promise.resolve(func(req,res,next)).catch(next)

}