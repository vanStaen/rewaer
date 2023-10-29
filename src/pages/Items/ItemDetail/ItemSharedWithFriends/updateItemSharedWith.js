import axios from "axios";

export async function updateItemSharedWith(id, sharedWith) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $sharedWith: [Int]) {
              updateItem(
                itemId: $id,
                itemInput: { 
                  sharedWith: $sharedWith 
                      }
              ) {
                _id,
              }
            }
            `,
    variables: {
      id,
      sharedWith,
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
