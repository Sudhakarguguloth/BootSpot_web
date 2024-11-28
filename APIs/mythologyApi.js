//create mini-express application(A Router)
const exp=require("express")
const mythologyApp=exp.Router()

//import expressAsyncHandler
const expressAsyncHandler=require('express-async-handler')



//to handle get request
mythologyApp.get('/mythologies',expressAsyncHandler(async(request,response)=>{
    //get mythologycollectionobj
    const mythologyCollectionObj=request.app.get('mythologyCollectionObj')
    let mythologyList= await mythologyCollectionObj.find().toArray()
    response.status(200).send({message:'All Mythologies',payload:mythologyList})
}))




//export
module.exports=mythologyApp;