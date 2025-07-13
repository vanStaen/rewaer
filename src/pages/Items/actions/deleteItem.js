export async function deleteItem(id) {
  const requestBody = {
    query: `
            mutation ($id: ID!) {
                deleteItem(itemId: $id) 
            }
            `,
    variables: {
      id,
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
