//create mini-express application(A Router)
const exp=require("express")
const horrorsApp=exp.Router()

//import expressAsyncHandler
const expressAsyncHandler=require('express-async-handler')



//to handle get request
horrorsApp.get('/horrors',expressAsyncHandler(async(request,response)=>{
    //get horrorcollectionobj
    const horrorCollectionObj=request.app.get('horrorCollectionObj')
    let horrorList= await horrorCollectionObj.find().toArray()
    response.status(200).send({message:'All Horrors',payload:horrorList})
}))




//export
module.exports=horrorsApp;