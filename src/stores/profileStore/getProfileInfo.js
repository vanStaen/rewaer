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

  const response = await fetch(process.env.API_URL + `/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Unauthenticated!");
  }

  const data = await response.json();
  return data.data.getProfileByName;
};
