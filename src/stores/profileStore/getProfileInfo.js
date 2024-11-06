import axios from "axios";

export const getProfileInfo = async (username) => {
  const requestBody = {
    query: `
        {
            getProfileByName (userName: "${username}"){
              id,
              firstName,
              lastName,
              avatar,
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
              profilSettings,
              items {
                id,
                title,
                mediaId,
                likes, 
                dislikes,
              },
              looks {
                id,
                title,
                mediaId,
                likes, 
                dislikes,
              }
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

  return response.data.data.getProfileByName;
};
