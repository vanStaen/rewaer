import axios from "axios";

export async function updateLikeDislike(id, type, isLike, valueArray) {
  let requestBody;

  if (type === "look") {
    if (isLike) {
      requestBody = {
        query: `
              mutation ($id: ID!, $valueArray: [Int]) {
                updateLook(
                  lookId: $lookId,
                  lookInput: { 
                    likes: $valueArray 
                        }
                ) {
                  id,
                  valueArray,
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
              mutation ($id: ID!, $valueArray: [Int]) {
                updateLook(
                  lookId: $lookId,
                  lookInput: { 
                    dislikes: $valueArray 
                        }
                ) {
                  id,
                  valueArray,
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
              mutation ($id: ID!, $valueArray: [Int]) {
                updateItem(
                  itemId: $itemId,
                  itemInput: { 
                    likes: $valueArray 
                        }
                ) {
                  id,
                  valueArray,
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
              mutation ($id: ID!, $valueArray: [Int]) {
                updateItem(
                  itemId: $itemId,
                  itemInput: { 
                    dislikes: $valueArray 
                        }
                ) {
                  id,
                  valueArray,
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
