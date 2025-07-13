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
  return data.data.getUser;
};
