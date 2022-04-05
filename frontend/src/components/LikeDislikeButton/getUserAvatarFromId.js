import axios from "axios";

export const getUserAvatarFromId = async (id) => {
  const requestBody = {
    query: `
        {
            getProfileById (_id: "${id}"){
              avatar,
              userName,
            }
          }
          `,
  };

  const response = await axios({
    url: process.env.API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }

  return response.data.data.getProfileById;
};
