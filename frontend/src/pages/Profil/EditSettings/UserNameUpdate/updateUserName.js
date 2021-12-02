import axios from "axios";
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
        _id,
      }
    }
    `,
    variables: {
      userName,
      usernameChange,
    },
  };

  const response = await axios({
    url: process.env.API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    notification.error({
      message: `Unauthenticated!`,
      placement: "bottomRight",
    });
    throw new Error("Unauthenticated!");
  }
  return true;
}
