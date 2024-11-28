//create mini-express application(A Router)
const exp=require("express")
const fictionApp=exp.Router()

//import expressAsyncHandler
const expressAsyncHandler=require('express-async-handler')



//to handle get request
fictionApp.get('/fictions',expressAsyncHandler(async(request,response)=>{
    //get fictioncollectionobj
    const fictionCollectionObj=request.app.get('fictionCollectionObj')
    let fictionList= await fictionCollectionObj.find().toArray()
    response.status(200).send({message:'All Fictions',payload:fictionList})
}))




//export
module.exports=fictionApp;