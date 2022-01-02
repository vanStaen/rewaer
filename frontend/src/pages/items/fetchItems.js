import axios from "axios";

export async function fetchItems() {
  const requestBody = {
    query: `
      {
        getItems {
          _id,
          title,
          notes,
          location,
          category,
          colors,
          pattern,
          brand,
          active,
          favorite,
          private,
          sharedWith,
          likes,
          status,
          dislikes,
          createdAt,
          mediaUrl,
          mediaUrlMedium,
          mediaUrlThumb,
          user {
              _id,
          }
        }
      }
      `,
  };

  const response = await axios({
    url: process.env.API_URL + `/graphql/`,
    method: "POST",
    data: requestBody,
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
  const items = await response.data.data.getItems;
  return items;
}
