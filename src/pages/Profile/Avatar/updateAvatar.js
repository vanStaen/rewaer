import axios from "axios";
import { notification } from "antd";

export async function updateAvatar(
  mediaId,
) {

  const requestBody = {
    query: `
    mutation ($mediaId: String) {
      updateUser(
        userInput: {
          avatar: $mediaId,
        }
      ) {
        avatar,
      }
    }`,
    variables: {
      mediaId,
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
