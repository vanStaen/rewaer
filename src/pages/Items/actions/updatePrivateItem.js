import axios from "axios";

export async function updatePrivateItem(id, isPrivate) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $isPrivate: Boolean) {
              updateItem(
                itemId: $id,
                itemInput: { 
                      private: $isPrivate 
                      }
              ) {
                id,
                private
              }
            }
            `,
    variables: {
      id,
      isPrivate,
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
