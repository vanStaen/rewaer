import { notification } from "antd";

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
  mediaId: string,
  title: string
): Promise<AddLookResponse> {
  const requestBody = {
    query: `
        mutation ($mediaId: String, $title: String) {
          addLook(
              lookInput: { mediaId: $mediaId, 
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
  const newLook: AddLookResponse = await response.json();
  return newLook;
}
