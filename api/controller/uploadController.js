const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const router = express.Router();

const { resizeImageFromUrl } = require("../../lib/processImageSharp");
const uploadFileFromBufferToS3 = require("../../lib/uploadFileFromBufferToS3");

// Limits size of 10MB
const sizeLimits = { fileSize: 1024 * 1024 * 10 };

// Allow only JPG and PNG
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    console.log("Wrong format!");
    callback(null, true);
  }
};

// Setup the AWS
AWS.config.region = "eu-west-1";
AWS.config.signatureVersion = "v4";

// Define s3 bucket login info
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_IAM_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  Bucket: process.env.S3_BUCKET_ID,
});

// Define upload function as Single upload of 'file' to s3
const uploadParser = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_ID,
    acl: "public-read",
  }),
  limits: sizeLimits,
  fileFilter: fileFilter,
}).single("file");

// POST single file object to s3
router.post(
  "/",
  (req, res) => {
    uploadParser(req, res, async (error) => {
      if (error) {
        console.log("Upload s3, error: ", error);
        res.json({ error: error });
      } else {
        // If File not found
        if (req.file === undefined) {
          res.json({ Error: "No File Selected" });
        } else {
          const imageOriginalName = req.file.originalname;
          const imageUrl = req.file.location;
          const nameImageThumb = "t_" + req.file.key;
          const nameImageMedium = "m_" + req.file.key;
          // If file, upload to S3
          try {
            const [thumbBufferLocal, mediumBufferLocal] = await Promise.all([
              resizeImageFromUrl(imageUrl, 240),
              resizeImageFromUrl(imageUrl, 750),
            ]);
            console.log("thumbBufferLocal", thumbBufferLocal);
            console.log("mediumBufferLocal", mediumBufferLocal);
            const [UrlThumbS3, UrlMediumbS3] = await Promise.all([
              uploadFileFromBufferToS3(thumbBufferLocal, nameImageThumb),
              uploadFileFromBufferToS3(mediumBufferLocal, nameImageMedium),
            ]);
            // Return file name and file url to client
            return res.status(200).json({
              message: "Upload success!",
              id: req.file.key,
              imageOriginalName: imageOriginalName,
              imageUrl: imageUrl,
              thumbUrl: UrlThumbS3,
              mediumUrl: UrlMediumbS3,
            });
          }
          catch (err) {
            console.log('upload controller:', err);
            return res.status(400).json({ error: err });
          };
        }
      }
    });
  }
);

// DELETE single file object from s3 (based on key)
router.delete("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: req.params.id
    };
    const paramsThumb = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: "t_" + req.params.id,
    };
    const paramsMedium = {
      Bucket: process.env.S3_BUCKET_ID,
      Key: "m_" + req.params.id,
    };
    await Promise.all([
      s3.deleteObject(params, function (err, data) { }),
      s3.deleteObject(paramsThumb, function (err, data) { }),
      s3.deleteObject(paramsMedium, function (err, data) { }),
    ]);
    res.status(204).json({});
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;