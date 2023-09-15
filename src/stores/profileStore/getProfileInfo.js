import axios from "axios";

export const getProfileInfo = async (username) => {
  const requestBody = {
    query: `
        {
            getProfileByName (userName: "${username}"){
              firstName,
              lastName,
              avatar,
              gender,
              friends {
                userName,
                avatar,
              },
              followers {
                userName,
                avatar,
              },
              followed {
                userName,
                avatar,
              },
              lastActive,
              profilSettings,
              items {
                _id,
                title,
                mediaUrlMedium,
                likes, 
                dislikes,
              },
              looks {
                _id,
                title,
                mediaUrlMedium,
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
