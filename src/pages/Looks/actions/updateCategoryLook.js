export async function updateCategoryLook(id, category) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $category: String) {
              updateLook(
                lookId: $id,
                lookInput: { 
                      category: $category 
                      }
              ) {
                id,
                category
              }
            }
            `,
    variables: {
      id,
      category,
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
