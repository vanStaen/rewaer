import axios from "axios";

export async function archiveLook(id, active) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $active: Boolean) {
              updateLook(
                lookId: $id,
                lookInput: { 
                      active: $active 
                      }
              ) {
                id,
                active
              }
            }
            `,
    variables: {
      id,
      active,
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
