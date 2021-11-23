import axios from "axios";

export const getUserInfo = async () => {
  const requestBody = {
    query: `
        {
            getUser {
              firstName,
              lastName,
              userName,
              email,
              avatar,
              emailSettings,
              profilSettings,
              language,
              friends,
              lastActive
            }
          }
          `,
  };

  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }

  return response.data.data.getUser;
};
