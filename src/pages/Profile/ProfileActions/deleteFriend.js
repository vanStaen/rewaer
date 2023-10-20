import axios from "axios";

export const deleteFriend = async (friendId) => {
  const requestBody = {
    friendId: friendId,
  };

  try {
    const response = await axios({
      url: process.env.API_URL + `/social/friend/`,
      method: "DELETE",
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
