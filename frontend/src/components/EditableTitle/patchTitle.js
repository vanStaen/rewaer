import axios from "axios";
import { notification } from "antd";

export async function patchTitle(title, id, type) {
  let requestBody = {};

  if (type === "look") {
    requestBody = {
      query: `
                mutation ($id: Int, $title: String) {
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
                mutation ($id: Int, $title: String) {
                    updateItem(
                        itemId: $id
                        itemInput: { title: $title }
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
  } else {
    throw new Error("Type missing!");
  }

  const response = await axios({
    url: process.env.API_URL,
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

  console.log(response);

  return response;
}
