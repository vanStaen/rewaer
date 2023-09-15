import axios from "axios";

export async function updateFavoriteLook(id, favorite) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $favorite: Boolean) {
              updateLook(
                lookId: $id,
                lookInput: { 
                      favorite: $favorite 
                      }
              ) {
                _id,
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
