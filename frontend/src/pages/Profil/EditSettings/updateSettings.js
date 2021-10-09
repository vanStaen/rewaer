import axios from "axios";
import { notification } from "antd";

export async function updateSettings(
  profilSettings,
  emailSettings, 
) {

  const emailSettingsString = JSON.stringify(emailSettings);
  const profilSettingsString = JSON.stringify(profilSettings);

  console.log(emailSettingsString);
  console.log(profilSettingsString);

  const requestBody = {
    query: `
    mutation {
      updateUser(
        userInput: {          
        profilSettings: "${emailSettingsString}",
        emailSettings: "${profilSettingsString}",
        }
      ) {
        _id,
      }
    }
          `,
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