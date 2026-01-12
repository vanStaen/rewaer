export const deleteNotification = async (
  id: string,
): Promise<boolean | any> => {
  try {
    const requestBody = {
      id,
    };

    await fetch(process.env.API_URL + `/notification/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    return true;
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response ? err.response.data : null;
  }
};
