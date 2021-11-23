import axios from "axios";

export async function deleteItem(id) {
  const requestBody = {
    query: `
            mutation ($id: ID!) {
                deleteItem(itemId: $id) 
            }
            `,
    variables: {
      id,
    },
  };

  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
}
