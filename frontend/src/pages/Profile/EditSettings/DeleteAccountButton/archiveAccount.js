import axios from "axios";
import { notification } from "antd";

export async function archiveAccount(archived) {
  const requestBody = {
    query: `
    mutation ($archived: Boolean) {
      updateUser(
        userInput: {          
          archived: $archived,
        }
      ) {
        _id,
      }
    }    
    `,
    variables: {
      archived
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
