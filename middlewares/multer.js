const multer=require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
       return cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        return  cb(null, Date.now() + file.originalname);
    },
  });
  
  module.exports = {storage};