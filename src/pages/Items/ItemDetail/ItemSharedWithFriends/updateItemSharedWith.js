export async function updateItemSharedWith(id, sharedWith) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $sharedWith: [Int]) {
              updateItem(
                itemId: $id,
                itemInput: { 
                  sharedWith: $sharedWith 
                      }
              ) {
                id,
              }
            }
            `,
    variables: {
      id,
      sharedWith,
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
