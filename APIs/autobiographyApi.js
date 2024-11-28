//create mini-express application(A Router)
const exp=require("express")
const autobiographyApp=exp.Router()

//import expressAsyncHandler
const expressAsyncHandler=require('express-async-handler')



//to handle get request
autobiographyApp.get('/autobiographies',expressAsyncHandler(async(request,response)=>{
    //get autobiographycollectionobj
    const autobiographyCollectionObj=request.app.get('autobiographyCollectionObj')
    let autobiographyList= await autobiographyCollectionObj.find().toArray()
    response.status(200).send({message:'All Autobiographies',payload:autobiographyList})
}))




//export
module.exports=autobiographyApp;