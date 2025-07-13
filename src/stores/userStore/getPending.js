export const getPending = async () => {
  try {
    const response = await fetch(process.env.API_URL + `/social/friendspending/`, {
      method: "GET",
    });
    const data = await response.json();
    return data.pending;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response ? err.response.data.success : null;
  }
};
