import axios from "axios";

export async function pictureFlip(url, isMirror) {
  const requestBody = {
    url: url,
    isMirror: isMirror,
  };

  const response = await axios({
    url: process.env.API_URL + `/picture/flip`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }

  return response.data.newUrl;
}
