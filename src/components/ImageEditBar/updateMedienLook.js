export async function updateMedienLook(id, mediaId) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $mediaId: String) {
              updateLook(
                lookId: $id,
                lookInput: { 
                      mediaId: $mediaId,
                      }
              ) {
                id,
                mediaId,
              }
            }
            `,
    variables: {
      id,
      mediaId,
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
