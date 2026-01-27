import { notification } from "antd";
import { LookInput } from "@type/lookTypes";

interface AddLookResponse {
  data?: {
    addLook: {
      id: string;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

export async function postNewLook(
  lookInput: LookInput,
): Promise<AddLookResponse> {
  const requestBody = {
    query: `
        mutation ($lookInput: LookInputData!) {
            addLook(lookInput: $lookInput) {
              id
            }
          }
          `,
    variables: {
      lookInput,
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
  const newLook: AddLookResponse = await response.json();
  return newLook;
}
