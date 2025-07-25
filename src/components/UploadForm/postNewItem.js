import { notification } from "antd";

export async function postNewItem(mediaId, title) {
  const requestBody = {
    query: `
        mutation ($mediaId: String, $title: String) {
          addItem(
            itemInput: { mediaId: $mediaId, 
                         title: $title }
            ) {
              id
            }
          }
          `,
    variables: {
      mediaId,
      title,
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
  const newLook = await response.json();
  return newLook;
}
