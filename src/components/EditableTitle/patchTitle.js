import { notification } from "antd";

export async function patchTitle(title, id, type) {
  let requestBody = {};

  if (type === "look") {
    requestBody = {
      query: `
                mutation ($id: ID!, $title: String) {
                    updateLook(
                        lookId: $id
                        lookInput: { title: $title }
                    ) {
                        title
                    }
                }
                `,
      variables: {
        id: id,
        title: title,
      },
    };
  } else if (type === "item") {
    requestBody = {
      query: `
                mutation ($id: ID!, $title: String) {
                    updateItem(
                        itemId: $id
                        itemInput: { title: $title }
                    ) {
                        title
                    }
                }
                `,
      variables: {
        id,
        title,
      },
    };
  } else {
    throw new Error("Type missing!");
  }

  const response = await fetch(process.env.API_URL + `/graphql/`, {
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

  const data = await response.json();
  return data;
}
