export const postPicture = async (file, bucket) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("bucket", bucket);
    const endpoint = process.env.API_URL + "/upload";
    const options = {
      method: "POST",
      body: data,
    };
    const response = await fetch(endpoint, options);
    const path = await response.json();
    return path;
  } catch (error) {
    return error;
  }
};
