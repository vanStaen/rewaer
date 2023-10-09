import axios from "axios";

export const postFollow = async (followedId) => {
  const requestBody = {
    followed: followedId,
  };

  try {
    const response = await axios({
      url: process.env.API_URL + `/social/follow/`,
      method: "POST",
      data: requestBody,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response.data.success;
  }
};
