import axios from "axios";

export const getUserInfo = async () => {
  const requestBody = {
    query: `
        {
            getUser {
              _id,
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
                _id,
                userName,
                avatar,
              },
              followers {
                _id,
                userName,
                avatar,
              },
              followed {
                _id,
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
