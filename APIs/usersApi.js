//create mini-express application(A Router)
const exp=require("express")
const userApp=exp.Router()

//import expressAsynchandler to deal with errors
const expressAsyncHandler=require('express-async-handler')

//import bcryptjs to hash password
const bcryptjs=require('bcryptjs')

//import jwt token
const jwt=require('jsonwebtoken')

//import verifyToken
const verifyToken=require('./middlewares/verifyToken')

//body parser
userApp.use(exp.json())   //exp.json()is a builtin middleware

//import multerObj
// const multerObj=require("./middlewares/cloudinaryConfig")

//create a middleware-1
let middleware1=(request,response,next)=>{
   console.log("middleware-1 called");
   next()

}

//app.use(middleware1)

//create a middleware-2
let middleware2=(request,respone,next)=>{
   console.log("middleware2 called");
   next()
}
//app.use(middleware2)





//CREATE user API 
//get users
// userApp.get('/get-user',expressAsyncHandler(async(request,response)=>{   //request handler is performing asynchronous operation
//    const userCollectionObj=request.app.get('userCollectionObj')         // expressAsyncHandler will forward the err to err handling middleware automatically as request handler is the argument of it
                                                                        
//    //get users from db
   
//   let usersList= await userCollectionObj.find().toArray()
//   response.status(200).send({message:'All Users',payload:usersList})
   
  
  

// }))



//get users by username
//make it private route
// userApp.get('/get-user/:username',verifyToken,expressAsyncHandler(async(request,response)=>{
//    //get userCollectionObj
//    const userCollectionObj=request.app.get('userCollectionObj');
//    //get username from url
//    let usernameFromUrl=request.params.username
//    //find user
  
//    let userOfDB=await userCollectionObj.findOne({username:usernameFromUrl})
//    //if user doesn't exist
//    if(userOfDB===null){
//       response.status(200).send({message:'User not found'})
//    }
//    else{
//       //remove password from userOfDB
//       delete userOfDB.password;
//       //send password
//    response.status(200).send({message:'User found',payload:userOfDB})
//    }
  

// }))


//user login
userApp.post('/user-login',expressAsyncHandler(async(request,response)=>{
   //get user collection obj
   const userCollectionObj=request.app.get('userCollectionObj');
   //get user credentials from request
   const userCredObj=request.body;
   //verify username
   let userOfDB=await userCollectionObj.findOne({username:userCredObj.username})
   if(userOfDB===null){   //invalid
      response.status(200).send({message:'Invalid Username'})
   }
   else{
      //verify password
      //hash the password
      let isEqual=await bcryptjs.compare(userCredObj.password,userOfDB.password)
      if(isEqual===false){
         response.status(200).send({message:'Invalid password'})
      }
      else{
         //create a JWT token
         let jwtToken=jwt.sign({username:userOfDB.username},'abcdef',{expiresIn:20})
         //send token as response
         delete userOfDB.password;
         response.status(200).send({message:'success',token:jwtToken,user:userOfDB})
      
      }
   }

}))


//create user
//public route
userApp.post('/user-signup',expressAsyncHandler(async(request,response)=>{
   const userCollectionObj=request.app.get('userCollectionObj')

   //get newUser from request
   
   const newUser=request.body;
   
   //check for duplicate user by username
   let userOfDB=await userCollectionObj.findOne({username:newUser.username})
   //if user already exists, send res to client as 'user already existed'
   if(userOfDB!=null){
      response.status(200).send({message:'Username already existed'})
   }
   //if user not existed
   else{
     //hash the password
      let hashedPassword=await bcryptjs.hash(newUser.password,5)
     //replace the plain pass with hashed pass
     newUser.password=hashedPassword;
     //insert user
      userCollectionObj.insertOne(newUser)
      response.status(201).send({message:'user created'})
   }
    
}))






//update user
// userApp.put('/update-user',expressAsyncHandler(async (request,response)=>{
//    //get userCollection obj
//    const userCollectionObj=request.app.get('userCollectionObj');
//    //get modified user
//    let modifiedUser=request.body
//    //update user in db
//    let dbRes= await userCollectionObj.updateOne({id:modifiedUser.id},{$set:{...modifiedUser}});//spreads the entire obj
 
//    response.status(201).send({message:'User created'})
// }))



//delete user
// userApp.delete('/delete-user/:id',expressAsyncHandler(async(request,response)=>{
//    //get userCollection obj
// const userCollectionObj=request.app.get('userCollectionObj');
// userIdToBeDeleted=(+request.params.id)
// //delete user
// let dbres=await userCollectionObj.deleteOne({id:userIdToBeDeleted})
// response.status(200).send({message:'User deleted'})

// }))



//export userApp
module.exports=userApp;