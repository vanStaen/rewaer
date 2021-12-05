import axios from "axios";

export async function updateFavorite(id, favorite) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $favorite: Boolean) {
              updateItem(
                itemId: $id,
                itemInput: { 
                      favorite: $favorite 
                      }
              ) {
                favorite
              }
            }
            `,
    variables: {
      id,
      favorite,
    },
  };

  console.log(requestBody);

  const response = await axios({
    url: process.env.API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
}
