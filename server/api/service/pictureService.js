import {
  resizeImageFromBuffer,
  rotateImage,
  flipImage,
  mirrorImage,
} from "../../lib/processImageSharp.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { deleteFileFromS3 } from "../../lib/S3/deleteFileFromS3.js";

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
});

const uploadFileFromBufferToS3 = async (buffer, key) => {
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_ID,
    Key: key,
    Body: buffer,
    ContentType: "image/png",
  });
  await s3.send(putObjectCommand);
  return `https://${process.env.S3_BUCKET_ID}.s3.eu-central-1.amazonaws.com/${key}`;
};

// TODO

export const pictureService = {
  async rotatePicture(url, numberOfQuarterTurnToTheRight) {
    const key = url.split(".com/")[1];
    // increment version counter
    let version = 1;
    if (key.includes("-")) {
      version = parseInt(key.split("-")[1]) + 1;
    }
    const nameImageThumb = "t_" + key;
    const nameImageMedium = "m_" + key;
    // download picture
    const response = await fetch(url);
    const originalImageBuffer = Buffer.from(await response.arrayBuffer());
    // rotate picture
    const rotationInDegrees = numberOfQuarterTurnToTheRight * 90;
    const rotatedImageBuffer = await rotateImage(
      originalImageBuffer,
      rotationInDegrees,
    );
    // resize picture
    const [thumbBufferLocal, mediumBufferLocal] = await Promise.all([
      resizeImageFromBuffer(rotatedImageBuffer, 360),
      resizeImageFromBuffer(rotatedImageBuffer, 750),
    ]);
    // delete old pictures
    await deleteFileFromS3(key, "pictures");
    // upload new pictures
    const [UrlOriginalS3, UrlThumbS3, UrlMediumbS3] = await Promise.all([
      uploadFileFromBufferToS3(rotatedImageBuffer, `${key}-${version}`),
      uploadFileFromBufferToS3(
        thumbBufferLocal,
        `${nameImageThumb}-${version}`,
      ),
      uploadFileFromBufferToS3(
        mediumBufferLocal,
        `${nameImageMedium}-${version}`,
      ),
    ]);
    // return new Picture Url
    return { UrlOriginalS3, UrlThumbS3, UrlMediumbS3 };
  },

  async flipPicture(url, isMirror) {
    const key = url.split(".com/")[1];
    // increment version counter
    let version = 1;
    if (key.includes("-")) {
      version = parseInt(key.split("-")[1]) + 1;
    }
    const nameImageThumb = "t_" + key;
    const nameImageMedium = "m_" + key;
    // download picture
    const response = await fetch(url);
    const originalImageBuffer = Buffer.from(await response.arrayBuffer());
    let rotatedImageBuffer;
    if (isMirror) {
      // flip picture
      rotatedImageBuffer = await flipImage(originalImageBuffer);
    } else {
      // flip picture
      rotatedImageBuffer = await mirrorImage(originalImageBuffer);
    }
    // resize picture
    const [thumbBufferLocal, mediumBufferLocal] = await Promise.all([
      resizeImageFromBuffer(rotatedImageBuffer, 240),
      resizeImageFromBuffer(rotatedImageBuffer, 750),
    ]);
    // delete old pictures
    await deleteFileFromS3(key, "pictures");
    // upload new pictures
    const [UrlOriginalS3, UrlThumbS3, UrlMediumbS3] = await Promise.all([
      uploadFileFromBufferToS3(rotatedImageBuffer, `${key}-${version}`),
      uploadFileFromBufferToS3(
        thumbBufferLocal,
        `${nameImageThumb}-${version}`,
      ),
      uploadFileFromBufferToS3(
        mediumBufferLocal,
        `${nameImageMedium}-${version}`,
      ),
    ]);
    // return new Picture Url
    return { UrlOriginalS3, UrlThumbS3, UrlMediumbS3 };
  },

  async tintPicture(url, red, green, blue) {
    return true;
  },
};
