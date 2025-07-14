export async function fetchItems() {
  const requestBody = {
    query: `
      {
        getItems {
          id,
          title,
          notes,
          location,
          category,
          colors,
          pattern,
          size,
          brand,
          active,
          favorite,
          private,
          sharedWith,
          likes,
          status,
          dislikes,
          createdAt,
          mediaId,
          user {
              id,
              avatar,
              userName,
          }
        }
      }
      `,
  };

  const response = await fetch(process.env.API_URL + `/graphql/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Unauthenticated!");
  }
  const data = await response.json();
  const items = data.data.getItems;
  return items;
}
