export const getPictureUrl = async (path, bucket) => {
  try {
    const data = {
      path,
      bucket,
    };
    const endpoint = process.env.API_URL + "/upload/url";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, options);
    const responseJson = await response.json();
    return responseJson.url;
  } catch (error) {
    console.log(error);
    return error;
  }
};
