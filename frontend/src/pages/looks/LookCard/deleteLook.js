import axios from "axios";

export async function deleteLook(id) {
  const requestBody = {
    query: `
            mutation ($id: ID!) {
                deleteLook(lookId: $id) 
            }
            `,
    variables: {
      id,
    },
  };

  console.log(requestBody);

  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
}
