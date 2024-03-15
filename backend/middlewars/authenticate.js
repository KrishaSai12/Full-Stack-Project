const ErrorHandler = require("../utills/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//this middleware will work wheather the user is login or not
exports.isAuthenticatedUser = catchAsyncError(async (req,res,next)=>{
    const {token } = req.cookies // to get cokkies from the request we need cookies parser
    if(!token){ // token will not available when the time expires at that time token will be undefined
        return next(new ErrorHandler('Login first to Handle this Resource',401));

    }

    // decoding the jwt token to get the user id wheather the user is login or not
    const decoded = jwt.verify(token ,process.env.JWT_SECRET);
     req.user  = await User.findById(decoded.id); // taking id of the user
    next(); 

    
})

// this middle ware is used because we can access some routes only for the admin all users should not allow all the routes
exports.authorizeRoles = (...roles)=>{
   return  (req,res,next) =>{
        if(!roles.includes(req.user.role) )
        {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401));

        }
        next();
    }
}