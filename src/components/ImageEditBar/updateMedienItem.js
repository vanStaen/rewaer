import axios from "axios";

export async function updateMedienItem(id, mediaId) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $mediaId: String) {
              updateItem(
                itemId: $id,
                itemInput: { 
                      mediaId: $mediaId,
                      }
              ) {
                _id,
                mediaId,
              }
            }
            `,
    variables: {
      id,
      mediaId,
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
