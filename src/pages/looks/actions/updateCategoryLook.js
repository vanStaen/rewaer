import axios from "axios";

export async function updateCategoryLook(id, category) {
  const requestBody = {
    query: `
            mutation ($id: ID!, $category: String) {
              updateLook(
                lookId: $id,
                lookInput: { 
                      category: $category 
                      }
              ) {
                _id,
                category
              }
            }
            `,
    variables: {
      id,
      category,
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
