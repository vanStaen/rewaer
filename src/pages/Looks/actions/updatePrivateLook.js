export async function updatePrivateLook(id, isPrivate) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $isPrivate: Boolean) {
              updateLook(
                lookId: $id,
                lookInput: { 
                      private: $isPrivate 
                      }
              ) {
                id,
                private
              }
            }
            `,
    variables: {
      id,
      isPrivate,
    },
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
}
