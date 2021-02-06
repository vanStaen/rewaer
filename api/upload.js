const express = require("express");
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const router = express.Router();
const fs = require('fs');

const createThumbnail = require('../helpers/createThumbnail')
const uploadFileFromUrlToS3 = require('../helpers/uploadFileFromUrlToS3')
const deleteLocalFile = require('../helpers/deleteLocalFile')

// Limits size of 10MB
const sizeLimits = { fileSize: 1024 * 1024 * 10 };

// Allow only JPG and PNG
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    console.log("Wrong format!")
    callback(null, true)
  }
}

// Setup the AWS region
AWS.config.region = 'eu-west-1';

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
    key: function (req, file, cb) {
      console.log("file.path", file.path);
      console.log("file.originalname", file.originalname);
      cb(null, file.originalname);
  }
  }),
  limits: sizeLimits,
  fileFilter: fileFilter
}).single('file');

// POST single file object to s3
router.post('/', async (req, res, next) => {
  if (!req.isAuth)
    return res.status(401).json({ error: "Unauthenticated" });
  next();
}, (req, res) => {
  uploadS3(req, res, (error) => {
    if (error) {
      console.log('Upload s3, error: ', error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        res.json({ Error: 'No File Selected' });
      } else {
        // If Success
        const imageOriginalName = req.file.originalname;
        const imageUrl = req.file.location;
        const thumbName = "t_" + req.file.key;
        // Create Thumbnail
        createThumbnail(imageUrl, thumbName)
          .then(thumbUrlLocal => {
            fs.watch(thumbUrlLocal, () => { 
            uploadFileFromUrlToS3(thumbUrlLocal, thumbName)
              .then(thumbUrlS3 => {
                deleteLocalFile(thumbName);
                // Return file name and file url to client
                return res.status(200).json({
                  imageOriginalName: imageOriginalName,
                  imageUrl: imageUrl,
                  thumbUrl: thumbUrlS3
                });
              }).catch((err) => {
                console.log(err)
                return res.status(400).json({ error: err });
              });
            });
          });
      }
    }
  });
});


// DELETE single file object from s3 (based on key)
router.delete("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {   
    var params = {  Bucket: process.env.S3_BUCKET_ID, Key: req.params.id };
    s3.deleteObject(params, function(err, data) {
      console.log(`Object id ${req.params.id} has been deleted`);
      res.status(204).json({});
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});


module.exports = router;

/*

// OLD UPLOAD without thumbnail
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
          imageUrl: imageUrl,
          thumbUrl: imageUrl
        });
      }
    }
  });
});

*/