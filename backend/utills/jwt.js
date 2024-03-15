const sendToken = (user,statusCode,res)=>{
    //creating the jwt token
    const token = user.getJwtToken();

    //setting cokiess
    const options ={
        expires : new Date(Date.now() + process.env.COKKIES_EXPIRES_TIME *24*60*60*1000 ),
        httpOnly : true,
    }
    res.status(statusCode).cookie('token',token,options);

    res.status(statusCode).json({
        success:true,
        token,
        user
    })
}

module.exports = sendToken;