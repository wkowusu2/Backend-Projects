const multer = require('multer');
const path = require('path');
  
// multer adds a file field to the request object 
const storage = multer.diskStorage({
    //determining where the files will be stored  (public/uploads)  // this folder needs to be created in the root of your project folder
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },

    //determining how the file name is stored
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname) )
    }})

    //file filter function
    const checkFileFilter = (req,file, cb) => {
        if(file.mimetype.startsWith('image')){
            cb(null, true) //accept the image with no message
            // cb(error, false) means throw the error and reject the image
        }else {
            cb(new Error('this file is not an image'))
        }
    }
    
    //multer middleware 
const upload = multer({ storage: storage,
    fileFilter: checkFileFilter,
    limits: { fileSize: 1000000 }, // 1MB is the file size limit
 });

 module.exports = upload;