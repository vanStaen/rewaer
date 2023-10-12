import axios from "axios";

export const postNotificationsSeen = async () => {

  try {
    const response = await axios({
      url: process.env.API_URL + `/notification/seen`,
      method: "POST",
    });

    //console.log(response);
    return response.data;

  } catch (err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response.data;
  }
  
};
