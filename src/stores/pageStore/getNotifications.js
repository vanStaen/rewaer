export const getNotifications = async () => {
  try {
    const response = await fetch(process.env.API_URL + `/notification/`, {
      method: "GET",
    });
    const data = await response.json();
    return data.notifications;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response ? err.response.data : null;
  }
};
