const jwt=require('jsonwebtoken')

//write a middleware function to verify token
const verifyToken=(request,response,next)=>{
    //get bearer token from req.headers
    const bearerToken=request.headers.authorization; //Bearer token

    //if bearer token not found
    if(bearerToken===undefined){
        response.send({message:'Unauthorised user'})
    }
    else{
        //get token from Bearer token
        const token=bearerToken.split(" ")[1]; //["Bearer",token]
        //verify token
        try{
        jwt.verify(token,'abcdef')
        //call next middleware
        next()
        }
        catch(err){
            //forward error to err handling middleware
            next(new Error('Session expired, Verify that its you'))
        }

    }
}

module.exports=verifyToken;