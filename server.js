//create express application
const exp=require("express")
const app=exp()
//assign port number
app.listen(3500,()=>console.log('web server listening on port 3500'))

//get mongo client
const mclient=require('mongodb').MongoClient;

//connect db server using mongo client
mclient.connect('mongodb://127.0.0.1/27017')
.then(dbRef=>{
   //connect to database
   const booksdbObj=dbRef.db('booksdb')
   //connect to collections of this database
   const userCollectionObj=booksdbObj.collection('userscollection')
   const dramaCollectionObj=booksdbObj.collection('dramacollection')
   const horrorCollectionObj=booksdbObj.collection('horrorcollection')
   const fictionCollectionObj=booksdbObj.collection('fictioncollection')
   const adventureCollectionObj=booksdbObj.collection('adventurecollection')
   const autobiographyCollectionObj=booksdbObj.collection('autobiographycollection')
   const mythologyCollectionObj=booksdbObj.collection('mythologycollection')
   const favouriteCollectionObj=booksdbObj.collection('favouritecollection')

   app.set('userCollectionObj',userCollectionObj)  //key ,value
   app.set('dramaCollectionObj',dramaCollectionObj)
   app.set('horrorCollectionObj',horrorCollectionObj)
   app.set('fictionCollectionObj',fictionCollectionObj)
   app.set('adventureCollectionObj',adventureCollectionObj)
   app.set('autobiographyCollectionObj',autobiographyCollectionObj)
   app.set('mythologyCollectionObj',mythologyCollectionObj)
   app.set('favouriteCollectionObj',favouriteCollectionObj)

   console.log('DB connection success')
})
.catch(err=>{
   console.log('database connect error',err)
})

const path=require("path") //import to connect the react
//connect react build
app.use(exp.static(path.join(__dirname,'./build')))






//import userApp
const userApp=require("./APIs/usersApi")

//import dramaApp
const dramaApp=require("./APIs/dramaApi")

//import horrorsApp
const horrorsApp=require("./APIs/horrorsApi")

//import fictionApp
const fictionApp=require("./APIs/fictionApi")

//import adventureApp
const adventureApp=require("./APIs/adventureApi")

//import autobiographyApp
const autobiographyApp=require("./APIs/autobiographyApi")

//import mythologyApp
const mythologyApp=require("./APIs/mythologyApi")

//import favouriteApp
const favouriteApp=require("./APIs/favouriteApi")


const { DBRef } = require("mongodb")

//forward request to usersApi when request starts with '/users-api'
app.use('/users-api',userApp)


// //forward request to dramaApi when request starts with '/drama-api'
 app.use('/drama-api',dramaApp)

// //forward request to horrorsApi when request starts with '/horror-api'
 app.use('/horror-api',horrorsApp)

// //forward request to fictionApi when request starts with '/fiction-api'
app.use('/fiction-api',fictionApp)

// //forward request to adventureApi when request starts with '/adventure-api'
app.use('/adventure-api',adventureApp)

// //forward request to autobiographyApi when request starts with '/autobiography-api'
app.use('/autobiography-api',autobiographyApp)

// //forward request to autobiographyApi when request starts with '/autobiography-api'
app.use('/mythology-api',mythologyApp)

// //forward request to favoriteApi when request starts with '/favourite-api'
app.use('/favourite-api',favouriteApp)



//create a middleware to deal with page refresh
const pageRefresh=(request,response,next)=>{
   response.sendFile(path.join(__dirname,'./build/index.html'))
}
app.use("*",pageRefresh)

//invalid path
let invalidPathMiddleware=(request,response,next)=>{
   response.send({message:"invalid path"})
}
app.use("*",invalidPathMiddleware)  // '*' indicates that it matches with any string


//error handling middeware
let errorHandlingMiddleware=(error,request,response,next)=>{
   response.send({message:error.message})

}
app.use(errorHandlingMiddleware)
