import axios from "axios";

export const getProfileInfo = async (username) => {
  const requestBody = {
    query: `
        {
            getProfile {
              firstName,
              avatar,
              gender,
              friends,
              lastActive,
              items {
                _id,
                title,
                mediaUrlMedium,
                like, 
                dislike,
              },
              looks {
                  _id,
                  title,
                  mediaUrlMedium,
                  like, 
                  dislike,
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

  return response.data.data.getUser;
};
