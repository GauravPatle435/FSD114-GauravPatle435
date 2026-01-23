const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:async (requestAnimationFrame,file) =>{
    let resourceType = "auto";

    if (file.mimetype === "application/pdf"){
      resourceType = "raw";
    }
    
    if (file.mimetype.startsWith("video")){
      resourceType = "video";
    }
    return{
      folder:"eduvillage",
      resource_type: resourceType,
    }
  }
  // params: {
  //   folder: "eduvillage",
  //   resource_type: "auto",
  //   format:undefined
  // },
});

const upload = multer({ storage });

module.exports = upload;