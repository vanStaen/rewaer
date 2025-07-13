export async function updateFavoriteLook(id, favorite) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $favorite: Boolean) {
              updateLook(
                lookId: $id,
                lookInput: { 
                      favorite: $favorite 
                      }
              ) {
                id,
                favorite
              }
            }
            `,
    variables: {
      id,
      favorite,
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
