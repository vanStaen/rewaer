export const deleteLogout = async () => {
  const response = await fetch(process.env.API_URL + `/auth/logout/`, {
    method: "DELETE",
  });

  if (response.status !== 200) {
    throw new Error(`Error on Logout! Status ${response.status}`);
  }

  const data = await response.json();
  return data.success;
};
