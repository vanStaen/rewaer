import axios from "axios";

export async function fetchItems() {
  const requestBody = {
    query: `
      {
        getItems {
          _id,
          desc,
          category,
          colors,
          brand,
          active,
          favorite,
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
    url: process.env.REACT_APP_API_URL + `/graphql/`,
    method: "POST",
    data: requestBody,
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
  const items = await response.data.data.getItems;
  return items;
}
