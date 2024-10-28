import { S3Client, CopyObjectCommand } from "@aws-sdk/client-s3";
import { getBucketId } from "./getBuketId.js";

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
});

export const copyFileFromS3 = async (path, fromBucket, toBucket) => {
  const fromBucketId = getBucketId(fromBucket);
  const toBucketId = getBucketId(toBucket);

  try {
    const copyObjectCommandOriginal = new CopyObjectCommand({
      Bucket: toBucketId,
      CopySource: `/${fromBucketId}/${path}`,
      Key: path,
    });
    const copyObjectCommandMedium = new CopyObjectCommand({
      Bucket: toBucketId,
      CopySource: `/${fromBucketId}/${path}_m`,
      Key: `${path}_m`,
    });
    const copyObjectCommandThumb = new CopyObjectCommand({
      Bucket: toBucketId,
      CopySource: `/${fromBucketId}/${path}_t`,
      Key: `${path}_t`,
    });
    const copyObjectCommandBlur = new CopyObjectCommand({
      Bucket: toBucketId,
      CopySource: `/${fromBucketId}/${path}_t`,
      Key: `${path}_b`,
    });
    await s3.send(copyObjectCommandOriginal);
    await s3.send(copyObjectCommandMedium);
    await s3.send(copyObjectCommandThumb);
    await s3.send(copyObjectCommandBlur);

    return true;
  } catch (e) {
    console.error(e);
    return { e };
  }
};
