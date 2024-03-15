const catchAsyncError = require('../middlewars/catchAsyncError');
const User = require('../models/userModel');
const ErrorHandler = require('../utills/errorHandler');
const sendToken = require('../utills/jwt');
const crypto = require ('crypto');

// creates a user register from post request also which handles the error and promise
exports.registerUser = catchAsyncError(async (req,res,next) =>{
    const{name ,email,password}= req.body
    let profile  ;
    if(req.file){
        profile = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`;
    }
   const user = await User.create({
        name,
        email,
        password,
        profile
    });

    sendToken(user,201,res); // this function creates method that method has arguments using the arguments the response is send
 }

 )

//this  middleware is used for login the user
 exports.loginUser = catchAsyncError(async function(req,res,next){
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler('Please enter  email & password',400));

    }

    // finding the user from the database
    const user =  await User.findOne({email}).select('+password'); // we are taking the user based on email and taking password to verify it
    // if the user details  is empty
    if(!user){
        return next(new ErrorHandler('Invalid email or password',401));
    }
    // to matching the user password with database
    const compare = await user.isValidPassword(password);
    console.log(compare);
    if(!compare ){
        return next(new ErrorHandler('Invalid email or password',401));
    }

    sendToken(user ,201,res); // sending the response to the user
 })

// this middleware is used to logout the user
 exports.logoutUser = (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly : true
    })
    .status(200).json({
        success:true,
        message:"USER LOGGED OUT"
    })
 }

//forgot password middleware
 exports.forgotPassword = catchAsyncError(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler('User not found with this email' , 404))
    }
    const resetToken = user.getResetToken(); // wiil have reset password token and reset password expires 
    await user.save({validateBeforeSave :false}) // it will not validate the generated token

    // create the reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message = `Your Password reset url is given bellow \n\n
    ${resetUrl}\n\n
    If you have not required this email please ignore it `

    try{

    }catch(error){
        user.resetPasswordToken  = undefined // if not the email send we need not want this so we make it as undefined
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave :false})
        return next(new ErrorHandler(error.message),500)

    }

 })
// checking the reset token in the mail  with the reset token in the database
 exports.resetPassword =  catchAsyncError(async (req,res,next)=>{
   const resetPasswordToken= crypto.createHash('sha256').update( req.params.token ).digest('hex');
   // taking the value of the user based upon the reset password token 
   const user = await User.findOne({

    resetPasswordToken,
    resetPasswordTokenExpire:{
        $gt: Date.now() // the reset password token expires must be greather than the current value 
    }
   })
   if(!user){
    return next(new ErrorHandler('Password reset token is invalid or expired  ',401))
   }

   if(req.body.password !== req.body.confimPassword){
    return next(new ErrorHandler('Password does not match  ',401))
   }

   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordTokenExpire =undefined;
   await user.save({validateBeforeSave: false});

   sendToken(user,201,res)// cookie will be generated with the token

 })

 // Get user profile
 exports.getUserProfile = catchAsyncError(async (req,res,next) =>{
    const user = await User.findById(req.user.id); // user details  is find by the id 
    res.status(200).json({
        success:true,
        user
    })
 })

 //change the password 

 exports.changePassword = catchAsyncError(async (req,res,next) =>{
    const user = await User.findById(req.user.id).select('+password ')// get the user details by the id in which password is not available so we explicitly declare the password 

    //check the old password 
    if( !await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler('Old Password is inCorrect ',401))
    }
    // assigning the new Password 
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success :true,
        user
    })

 })

 // update the profile
 exports.updateProfile = catchAsyncError(async (req,res,next)=>{
    let newUserData = { // these are the fields where the update mainly happen
        name :req.body.name,
        email : req.body.email
    }
    let profile ;
    if(req.file){
        profile = `${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
        newUserData = {...newUserData , profile}
        
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new : true,
        runValidators : true 
    })
    res.status(200).json({
        success: true,
        user
    })
 })


 // Admin api services : Get all the user
 exports.getAllUsers = catchAsyncError(async (req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
 })

 // Get Specific users - Admin api services 
exports.getUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with this ID ${req.params.id}`,400));
    }
    res.status(200).json({
        success:true,
        user
    })
})

// Update the user - Admin api services
exports.updateUser = catchAsyncError(async (req,res,next)=>{
   const newUserData = {
    name:req.body.name,
    email:req.body.email,
    role : req.body.role
   }
   const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
    new:true,
    runValidators:true
   })

   res.status(200).json({
    success:true,
    user
   })

})
// delete the user - Admin api services
exports.deleteUser = catchAsyncError(async (req,res,next)=>{
    const user = await User.findByIdAndRemove(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with this ID ${req.params.id}`,400));
    }
   // await user.remove();
    res.status(200).json({
        success:true
    })

})