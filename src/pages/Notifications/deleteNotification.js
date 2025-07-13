import { API_URL } from "../../../config";
export const deleteNotification = async (id) => {
  try {
    const requestBody = {
      id: id,
    };

    await fetch(API_URL + `/notification/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    return true;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response ? err.response.data : null;
  }
};
