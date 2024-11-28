//create mini-express application(A Router)
const exp=require("express")
const dramaApp=exp.Router()

//import expressAsyncHandler
const expressAsyncHandler=require('express-async-handler')





//to handle get request
dramaApp.get('/dramas',expressAsyncHandler(async(request,response)=>{
    //get dramacollectionobj
    const dramaCollectionObj=request.app.get('dramaCollectionObj')
    let dramaList= await dramaCollectionObj.find().toArray()
    response.status(200).send({message:'All Dramas',payload:dramaList})
}))




//export
module.exports=dramaApp;