import axios from "axios";

export async function updateLikeDislike(itemId, type, isLike, valueArray) {
  let requestBody;

  if (type === "look") {
    if (isLike) {
      requestBody = {
        query: `
              mutation ($lookId: ID!, $valueArray: [Int]) {
                updateLook(
                  lookId: $lookId,
                  lookInput: { 
                    likes: $valueArray 
                        }
                ) {
                  _id,
                  likes,
                }
              }
              `,
        variables: {
          lookId,
          valueArray,
        },
      };
    } else {
      requestBody = {
        query: `
              mutation ($lookId: ID!, $valueArray: [Int]) {
                updateLook(
                  lookId: $lookId,
                  lookInput: { 
                    dislikes: $valueArray 
                        }
                ) {
                  _id,
                  dislikes,
                }
              }
              `,
        variables: {
          lookId,
          valueArray,
        },
      };
    }
  } else if (type === "item") {
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
