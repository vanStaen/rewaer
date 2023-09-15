import axios from "axios";

export async function updateLikeDislike(id, type, isLike, valueArray) {
  let requestBody;

  if (type === "look") {
    if (isLike) {
      requestBody = {
        query: `
              mutation ($id: ID!, $valueArray: [Int]) {
                updateLook(
                  lookId: $id,
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
          id,
          valueArray,
        },
      };
    } else {
      requestBody = {
        query: `
              mutation ($id: ID!, $valueArray: [Int]) {
                updateLook(
                  lookId: $id,
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
          id,
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
                  itemId: $id,
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
          id,
          valueArray,
        },
      };
    } else {
      requestBody = {
        query: `
              mutation ($id: ID!, $valueArray: [Int]) {
                updateItem(
                  itemId: $id,
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
          id,
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
