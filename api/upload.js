const express = require("express");
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const router = express.Router();

// Limits size of 5MB
const sizeLimits = { fileSize: 1024 * 1024 * 5 };

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
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: sizeLimits
}).single('file');

router.post('/', (req, res) => {
  uploadS3(req, res, (error) => {
    console.log('requestOkokok', req.file);
    console.log('error', error);
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
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          imageName: imageName,
          imageLocation: imageLocation
        });
      }
    }
  });
});


module.exports = router;


/*

// Allow only JPG nd PNG
const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(null, true)
  }
}

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


const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket: process.env.S3_BUCKET_ID,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`,
    };
    return s3.upload(params).promise();
  };


function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

*/
