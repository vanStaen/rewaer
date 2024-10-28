import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getBucketId } from "./getBuketId.js";

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
});

export const getUrlFromS3 = async (path, bucket) => {
  const s3BucketId = getBucketId(bucket);

  try {
    const command = new GetObjectCommand({ Bucket: s3BucketId, Key: path });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // expires in 1hour
    return url;
  } catch (e) {
    console.error(e);
    return { e };
  }
};
