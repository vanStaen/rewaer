export const deleteFollow = async (followedId) => {
  const requestBody = {
    followed: followedId,
  };

  try {
    const response = await fetch(process.env.API_URL + `/social/follow/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data.success;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response ? err.response.data.success : null;
  }
};
