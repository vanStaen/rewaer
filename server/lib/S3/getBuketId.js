export const getBucketId = (bucket) => {
  if (bucket === "test") {
    return process.env.S3_BUCKET_TEST;
  } else if (bucket === "events") {
    return process.env.S3_BUCKET_EVENTS;
  } else if (bucket === "users") {
    return process.env.S3_BUCKET_USERS;
  } else if (bucket === "partners") {
    return process.env.S3_BUCKET_PARTNERS;
  } else if (bucket === "bugs") {
    return process.env.S3_BUCKET_BUGS;
  } else if (bucket === "temp") {
    return process.env.S3_BUCKET_TEMP;
  } else {
    throw new Error("Bucket is missing/incorrect");
  }
};
