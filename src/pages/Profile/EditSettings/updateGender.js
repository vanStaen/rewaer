import { notification } from "antd";

export async function updateGender(gender) {
  const requestBody = {
    query: `
    mutation ($gender: Int!){
      updateUser(
        userInput: {          
          gender: $gender,
        }
      ) {
        id,
      }
    }
    `,
    variables: {
      gender,
    },
  };

  const response = await fetch(process.env.API_URL + `/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  if (response.status !== 200 && response.status !== 201) {
    notification.error({
      message: `Unauthenticated!`,
      placement: "bottomRight",
    });
    throw new Error("Unauthenticated!");
  }
  return true;
}
