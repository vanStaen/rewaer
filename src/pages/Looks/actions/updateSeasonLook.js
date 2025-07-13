export async function updateSeasonLook(id, season) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $season: String) {
              updateLook(
                lookId: $id,
                lookInput: { 
                  season: $season 
                      }
              ) {
                id,
                season
              }
            }
            `,
    variables: {
      id,
      season,
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
