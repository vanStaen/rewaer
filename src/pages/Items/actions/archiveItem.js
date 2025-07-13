export async function archiveItem(id, active) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $active: Boolean) {
              updateItem(
                itemId: $id,
                itemInput: { 
                      active: $active 
                      }
              ) {
                id,
                active
              }
            }
            `,
    variables: {
      id,
      active,
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
