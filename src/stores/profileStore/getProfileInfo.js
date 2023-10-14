import axios from "axios";

export const getProfileInfo = async (username) => {
  const requestBody = {
    query: `
        {
            getProfileByName (userName: "${username}"){
              _id,
              firstName,
              lastName,
              avatar,
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
              profilSettings,
              items {
                _id,
                title,
                mediaUrlMedium,
                mediaUrlThumb,
                likes, 
                dislikes,
              },
              looks {
                _id,
                title,
                mediaUrlMedium,
                mediaUrlThumb,
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
