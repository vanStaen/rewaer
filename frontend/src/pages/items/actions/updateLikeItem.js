import axios from "axios";

export async function updateLikeItem(itemId, isLike, valueArray) {
  let requestBody;
  if (isLike) {
    requestBody = {
      query: `
              mutation ($itemId: ID!, $valueArray: [Int]) {
                updateItem(
                  itemId: $itemId,
                  itemInput: { 
                    likes: $valueArray 
                        }
                ) {
                  _id,
                  likes,
                }
              }
              `,
      variables: {
        itemId,
        valueArray,
      },
    };
  } else {
    requestBody = {
      query: `
              mutation ($itemId: ID!, $valueArray: [Int]) {
                updateItem(
                  itemId: $itemId,
                  itemInput: { 
                    dislikes: $valueArray 
                        }
                ) {
                  _id,
                  dislikes,
                }
              }
              `,
      variables: {
        itemId,
        valueArray,
      },
    };
  }

  const response = await axios({
    url: process.env.API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }
}
