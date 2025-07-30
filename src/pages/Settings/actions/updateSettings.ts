import { notification } from "antd";

export async function updateSettings(emailSettings: any, profilSettings: any): Promise<boolean> {
  const requestBody = {
    query: `
    mutation ($emailSettings: String, $profilSettings: String){
      updateUser(
        userInput: {          
          emailSettings: $emailSettings,
          profilSettings: $profilSettings,
        }
      ) {
        id,
      }
    }
    `,
    variables: {
      emailSettings: JSON.stringify(emailSettings),
      profilSettings: JSON.stringify(profilSettings),
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