import axios from "axios";
import { notification } from "antd";

export async function updateSettings(profilSettings, emailSettings) {
  const requestBody = {
    query: `
    mutation ($emailSettings: String, $profilSettings: String){
      updateUser(
        userInput: {          
        profilSettings: $emailSettings,
        emailSettings: $profilSettings,
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
    url: process.env.REACT_APP_API_URL + `/graphql`,
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
