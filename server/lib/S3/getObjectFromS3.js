import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getBucketId } from "./getBuketId.js";

const s3 = new S3Client({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
});

export const getObjectFromS3 = async (path, bucket) => {
  const s3BucketId = getBucketId(bucket);
  try {
    const command = new GetObjectCommand({ Bucket: s3BucketId, Key: path });
    const response = await s3.send(command);

    // Convert stream to buffer
    const chunks = [];
    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  } catch (err) {
    throw err;
  }
};
