import { notification } from "antd";

export async function updateUserName(userName, usernameChange) {
  const requestBody = {
    query: `
    mutation ($userName: String, $usernameChange: Int){
      updateUser(
        userInput: {          
          userName: $userName,
          usernameChange: $usernameChange
        }
      ) {
        id,
      }
    }
    `,
    variables: {
      userName,
      usernameChange,
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
