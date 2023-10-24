import axios from "axios";

export const postAcceptRequest = async (friendId) => {
  const requestBody = {
    friendId: friendId,
  };

  try {
    const response = await axios({
      url: process.env.API_URL + `/social/validatefriendrequest/`,
      method: "POST",
      data: requestBody,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response.data;
  }
};
