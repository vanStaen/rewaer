import axios from "axios";

export const getUserInfo = async () => {
  const requestBody = {
    query: `
        {
            getUser {
              id,
              firstName,
              lastName,
              userName,
              email,
              avatar,
              emailSettings,
              profilSettings,
              language,
              gender,
              friends {
                id,
                userName,
                avatar,
              },
              followers {
                id,
                userName,
                avatar,
              },
              followed {
                id,
                userName,
                avatar,
              },
              lastActive,
              archived,
              usernameChange,
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

  return response.data.data.getUser;
};
