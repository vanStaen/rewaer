import axios from "axios";

export const getPending = async () => {
  try {
    const response = await axios({
      url: process.env.API_URL + `/social/friendspending/`,
      method: "GET",
    });
    return response.data.pending;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response.data.success;
  }
};
