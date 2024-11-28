//create mini-express application(A Router)
const exp=require("express")
const favouriteApp=exp.Router()
//body parser (for post and put)
favouriteApp.use(exp.json())
//import expressAsyncHandler
const expressAsyncHandler=require('express-async-handler')

favouriteApp.post('/favourites',expressAsyncHandler(async(request,response)=>{
   const favouriteCollectionObj=request.app.get('favouriteCollectionObj')
  // console.log(request)
   const favBook =request.body
   console.log(favBook)
  await favouriteCollectionObj.insertOne(favBook)
  response.status(200).send({message:'favourite posted'})
}))

favouriteApp.get('/getfavourites',expressAsyncHandler(async(request,response)=>{
  const favouriteCollectionObj=request.app.get('favouriteCollectionObj')
  let favouriteList= await favouriteCollectionObj.find().toArray()
  response.status(200).send({message:'All favourites',payload:favouriteList})
}))

favouriteApp.delete('/deletefavourite/:id',expressAsyncHandler(async(request,response)=>{
  const favouriteCollectionObj=request.app.get('favouriteCollectionObj')
  let idToBeDeleted=request.params.id
  await favouriteCollectionObj.deleteOne({_id:idToBeDeleted})
  response.status(200).send({message:'favourite deleted'})
}))


favouriteApp.get('/getfavourites?name/:username',expressAsyncHandler(async(request,response)=>{
  const favouriteCollectionObj=request.app.get('favouriteCollectionObj')
  let usernameFavBooks=request.params.username
  let favouriteList= await favouriteCollectionObj.find({name:usernameFavBooks}).toArray()
  response.status(200).send({message:'All favourites of a user',payload:favouriteList})


}))


//export
module.exports=favouriteApp;