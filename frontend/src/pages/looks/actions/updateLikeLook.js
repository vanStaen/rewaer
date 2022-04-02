import axios from "axios";

export async function updateLikeLook(lookId, isLike, valueArray) {
  console.log("lookId, valueArray", lookId, valueArray);
  let requestBody;
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
                  _id
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
                  _id
                }
              }
              `,
      variables: {
        lookId,
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
