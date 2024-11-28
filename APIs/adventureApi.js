//create mini-express application(A Router)
const exp=require("express")
const adventureApp=exp.Router()

//import expressAsyncHandler
const expressAsyncHandler=require('express-async-handler')



//to handle get request
adventureApp.get('/adventures',expressAsyncHandler(async(request,response)=>{
    //get adventurecollectionobj
    const adventureCollectionObj=request.app.get('adventureCollectionObj')
    let adventureList= await adventureCollectionObj.find().toArray()
    response.status(200).send({message:'All Adventures',payload:adventureList})
}))




//export
module.exports=adventureApp;