import axios from "axios";

export async function postGetProfileById(id) {
  const requestBody = {
    query: `
      {
        getProfileById (_id: $id) {
          avatar,
          userName,
        }
      }
      `,
      variables: {
        id,
      },
  };

  const response = await axios({
    url: process.env.API_URL + `/graphql/`,
    method: "POST",
    data: requestBody,
  });

  console.log(response);

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
  return response.data; 
}
