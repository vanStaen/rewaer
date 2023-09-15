import axios from "axios";

export const deleteLogout = async () => {
  const response = await axios({
    url: process.env.API_URL + `/auth/logout/`,
    method: "DELETE",
  });

  if (response.status !== 200) {
    throw new Error(`Error on Logout! Status ${response.status}`);
  }

  return response.data.success;

};
