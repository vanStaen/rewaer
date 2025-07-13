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
