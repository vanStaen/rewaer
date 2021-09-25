import axios from "axios";

export async function fetchLooks() {
  const requestBody = {
    query: `
      {
        getLooks {
          _id,
          title,
          active,
          favorite,
          createdAt,
          mediaUrl,
          user {
              _id,
          }
        }
      }
      `,
  };
  
  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/graphql/`,
    method: "POST",
    data: requestBody,
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
  const looks = await response.data.data.looks;
  return looks;
}
