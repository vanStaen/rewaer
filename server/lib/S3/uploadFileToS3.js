import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { getBucketId } from "./getBuketId.js";

import { resizeImageFromBuffer, blurImage } from "../processImageSharp.js";

const THUMB_SIZE_IN_PX = 240;
const MEDIUM_SIZE_IN_PX = 800;

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
});

export const uploadFileToS3 = async (file, bucket, userId) => {
  const key = uuid();
  const path = `${userId}/${key}`;
  const s3BucketId = getBucketId(bucket);

  try {
    const putObjectOriginal = new PutObjectCommand({
      Bucket: s3BucketId,
      Key: path,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await s3.send(putObjectOriginal);

    if (bucket !== "bugs") {
      const fileThumb = await resizeImageFromBuffer(
        file.buffer,
        THUMB_SIZE_IN_PX,
      );
      const fileMedium = await resizeImageFromBuffer(
        file.buffer,
        MEDIUM_SIZE_IN_PX,
      );
      const fileBlur = await blurImage(fileThumb, 10);

      const putObjectMedium = new PutObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_m`,
        Body: fileMedium,
        ContentType: "image/png",
      });
      const putObjectThumb = new PutObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_t`,
        Body: fileThumb,
        ContentType: "image/png",
      });
      const putObjectBlur = new PutObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_b`,
        Body: fileBlur,
        ContentType: "image/png",
      });
      await s3.send(putObjectMedium);
      await s3.send(putObjectThumb);
      await s3.send(putObjectBlur);
    }
    return path;
  } catch (e) {
    return e;
  }
};
