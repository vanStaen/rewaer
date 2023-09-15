import axios from "axios";
import { notification } from "antd";

export async function updateAvatar(
  mediaUrl,
) {
  
  const requestBody = {
    query: `
    mutation ($mediaUrl: String) {
      updateUser(
        userInput: {
          avatar: $mediaUrl,
        }
      ) {
        avatar,
      }
    }`,
    variables: {
      mediaUrl,
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
