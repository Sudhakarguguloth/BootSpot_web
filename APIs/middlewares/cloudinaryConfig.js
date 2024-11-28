const cloudinary=require("cloudinary").v2
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary") //CloudinaryStorage is a named export

//configure cloudinary
cloudinary.config({
    cloud_name:"db6vpgrjn",
    api_key:"429791694559763",
    api_secret:"CEshAELxyP6XPGGJSBw3Jd35hNk"
})
//configure cloudinary storage
let clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"E-Commerce",
        public_id:(request,file)=>file.fieldname+"-"+Date.now()
    }
})
//configure multer
let multerObj=multer({storage:clStorage})

//export multerObj
module.exports=multerObj