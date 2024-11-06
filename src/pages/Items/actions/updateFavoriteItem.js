import axios from "axios";

export async function updateFavoriteItem(id, favorite) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $favorite: Boolean) {
              updateItem(
                itemId: $id,
                itemInput: { 
                      favorite: $favorite 
                      }
              ) {
                id,
                favorite
              }
            }
            `,
    variables: {
      id,
      favorite,
    },
  };

  const response = await axios({
    url: process.env.API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
}
