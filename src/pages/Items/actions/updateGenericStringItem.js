export async function updateGenericStringItem(id, field, value) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $value: String ) {
              updateItem(
                itemId: $id,
                itemInput: { 
                      ${field}: $value 
                      }
              ) {
                id,
                ${field}
              }
            }
            `,
    variables: {
      id,
      value,
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
