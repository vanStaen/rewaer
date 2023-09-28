import axios from "axios";

export async function updateMedienItem(id, mediaUrl, mediaUrlThumb, mediaUrlMedium) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $mediaUrl: String, $mediaUrlThumb: String, $mediaUrlMedium: String) {
              updateItem(
                itemId: $id,
                itemInput: { 
                      mediaUrl: $mediaUrl,
                      mediaUrlThumb: $mediaUrlThumb,
                      mediaUrlMedium: $mediaUrlMedium,
                      }
              ) {
                _id,
                mediaUrl,
                mediaUrlThumb,
                mediaUrlMedium,
              }
            }
            `,
    variables: {
      id,
      mediaUrl,
      mediaUrlThumb,
      mediaUrlMedium
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
