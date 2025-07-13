export const getUserAvatarFromId = async (id) => {
  const requestBody = {
    query: `
        {
            getProfileById (id: "${id}"){
              avatar,
              userName,
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
  return data.data.getProfileById;
};
