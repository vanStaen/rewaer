export const deletePicture = async (path, bucket) => {
  try {
    const data = {
      path,
      bucket,
    };
    const endpoint = process.env.API_URL + "/upload/";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch(endpoint, options);
    return true;
  } catch (error) {
    return error;
  }
};
