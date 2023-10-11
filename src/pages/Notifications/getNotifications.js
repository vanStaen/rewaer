import axios from "axios";

export const getNotifications = async () => {

  try {
    const response = await axios({
      url: process.env.API_URL + `/notification/`,
      method: "GET",
    });

    return response.data.notifications;

  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response.data;
  }
  
};
