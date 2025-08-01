export const postNotificationsSeen = async (): Promise<any> => {
  try {
    const response = await fetch(process.env.API_URL + `/notification/seen`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response ? err.response.data : null;
  }
};
