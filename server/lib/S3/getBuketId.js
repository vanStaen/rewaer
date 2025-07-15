export const getBucketId = (bucket) => {
  if (bucket === "test") {
    return process.env.S3_BUCKET_TEST;
  } else if (bucket === "items") {
    return process.env.S3_BUCKET_ITEMS;
  } else if (bucket === "looks") {
    return process.env.S3_BUCKET_LOOKS;
  } else if (bucket === "users") {
    return process.env.S3_BUCKET_USERS;
  } else {
    throw new Error(`Bucket id ${bucket} does not exist`);
  }
};

// TODO create test bucket
