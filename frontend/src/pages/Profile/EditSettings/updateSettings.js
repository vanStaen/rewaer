import axios from "axios";
import { notification } from "antd";

export async function updateSettings(emailSettings, profilSettings) {
  const requestBody = {
    query: `
    mutation ($emailSettings: String, $profilSettings: String){
      updateUser(
        userInput: {          
          emailSettings: $emailSettings,
          profilSettings: $profilSettings,
        }
      ) {
        _id,
      }
    }
    `,
    variables: {
      emailSettings: JSON.stringify(emailSettings),
      profilSettings: JSON.stringify(profilSettings),
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
