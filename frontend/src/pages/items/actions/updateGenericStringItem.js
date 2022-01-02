import axios from "axios";

export async function updateGenericStringItem(id, field, value) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $value: String ) {
              updateItem(
                itemId: $id,
                itemInput: { 
                      ${field}: $value 
                      }
              ) {
                _id,
                ${field}
              }
            }
            `,
    variables: {
      id,
      value,
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
