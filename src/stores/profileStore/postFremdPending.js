import axios from "axios";

export const postFremdPending = async (userId) => {
  try {
    const requestBody = {
      userId: userId,
    };

    const response = await axios({
      url: process.env.API_URL + `/social/fremdfriendspending/`,
      method: "POST",
      data: requestBody,
    });
    return response.data.pending;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response.data.success;
  }
};
