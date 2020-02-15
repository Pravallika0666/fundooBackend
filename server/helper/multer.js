require('dotenv').config();
const AWS = require('aws-sdk');
//multer is a node js middleware for handling the multipart/form data for uploading the files
const multer = require('multer');
//multer s3 is used to store the data in aws
const multerS3 = require('multer-s3');

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const Bucket = process.env.BUCKET_NAME;

AWS.config.update({   
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  Bucket: Bucket
})
const s3 = new AWS.S3();
//fileFilter is used to control which files are to be accepted
const fileFilter = (request, file, cb) => {
  console.log("filesssss",file);
  
  //mimetype of the file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      console.log("in error");
      cb('Invalid file type, only JPEG and PNG is allowed!');
  }
}

const upload = multer({
  
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: Bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,//the mimetype used to upload the file
    acl: 'public-read',
    //metadata is a callback that accepts the request and file and returns a metadata object to be saved to s3
    metadata: (request, file, cb) => {
      console.log("request in multer--file-------", file);
      cb(null, { fieldName: 'Profile' });
    },
    //key is used to represent the name of the file
    key: (request, file, cb) => {
    
      cb(null, file.originalname);    
    }
  })
})
module.exports = upload;