const express = require("express");
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const router = express.Router();

// Limits size of 5MB
const sizeLimits = { fileSize: 1024 * 1024 * 5 };

// Allow only JPG nd PNG
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(null, true)
  }
}

// Define s23 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID
});

// Define upload function as Single upload of 'file' to s3
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_ID,
    acl: 'public-read',
  }),
  limits: sizeLimits,
  fileFilter: fileFilter
}).single('file');

router.post('/', (req, res, next) => {
  if (!req.isAuth)
    return res.status(401).json({ error: "Unauthenticated" });
  next();
}, (req, res) => {
  uploadS3(req, res, (error) => {
    console.log('Requested File: ', req.file);
    if (error) {
      console.log('errors', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log('Error: No File Selected!');
        res.json('Error: No File Selected');
      } else {
        // If Success
        const imageOriginalName = req.file.originalname;
        const imageUrl = req.file.location;
        // Return file name and file url to client
        res.json({
          imageOriginalName: imageOriginalName,
          imageUrl: imageUrl
        });
      }
    }
  });
});


module.exports = router;

/*
// ### UPLOAD ON THE SERVER:

// Define the upload methods
const upload = multer({ dest: 'public/uploads/', limits: sizeLimits, fileFilter: fileFilter });

// POST upload
router.post("/", (req, res, next) => {
  if (!req.isAuth)
    return res.status(401).json({ error: "Unauthenticated" });
  next();
}, upload.single('file'), (req, res, next) => {
  console.log('Uploaded File', req.file);
  res.status(200).json({ uploadedFileName: req.file.filename });
});
*/
