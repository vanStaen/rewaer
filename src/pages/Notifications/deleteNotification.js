import axios from "axios";

export const deleteNotification = async (id) => {

  try {
    const requestBody = {
      id: id,
    };

    await axios({
      url: process.env.API_URL + `/notification/`,
      method: "DELETE",
      data: requestBody,
    });
    return true;

  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response.data;
  }

};
