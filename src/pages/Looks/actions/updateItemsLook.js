export async function updateItemsLook(id, items) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $items: [Int]) {
              updateLook(
                lookId: $id,
                lookInput: { 
                      items: $items 
                      }
              ) {
                id,
                items
              }
            }
            `,
    variables: {
      id,
      items,
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
