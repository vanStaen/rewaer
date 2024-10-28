import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getBucketId } from "./getBuketId.js";

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
});

export const deleteFileFromS3 = async (path, bucket) => {
  const s3BucketId = getBucketId(bucket);

  try {
    const deleteObjectCommandOriginal = new DeleteObjectCommand({
      Bucket: s3BucketId,
      Key: path,
    });
    await s3.send(deleteObjectCommandOriginal);

    if (bucket !== "bugs") {
      const deleteObjectCommandMedium = new DeleteObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_m`,
      });
      const deleteObjectCommandThumb = new DeleteObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_t`,
      });
      const deleteObjectCommandBlur = new DeleteObjectCommand({
        Bucket: s3BucketId,
        Key: `${path}_b`,
      });
      await s3.send(deleteObjectCommandMedium);
      await s3.send(deleteObjectCommandThumb);
      await s3.send(deleteObjectCommandBlur);
    }

    return true;
  } catch (e) {
    console.error(e);
    return { e };
  }
};
