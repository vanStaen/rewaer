import { notification } from "antd";
import { ItemInput } from "@type/itemTypes";

interface AddItemResponse {
  data?: {
    addItem: {
      id: string;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export async function postNewItem(
  itemInput: ItemInput,
): Promise<AddItemResponse> {
  const requestBody = {
    query: `
        mutation ($itemInput: ItemInputData!) {
          addItem(itemInput: $itemInput) {
            id
          }
        }
      `,
    variables: {
      itemInput,
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
  const newItem: AddItemResponse = await response.json();
  return newItem;
}
