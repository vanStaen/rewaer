import axios from "axios";

export const getProfileInfo = async (username) => {
  const requestBody = {
    query: `
        {
            getProfile (userName: "${username}"){
              firstName,
              avatar,
              gender,
              friends,
              lastActive,
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

  return response.data.data.getProfile;
};
