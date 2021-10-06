import axios from "axios";

export const postUpdateSettings = async (emailSettings, profilSettings) => {
  const requestBody = {
    query: `
        mutation {
          updateUser(
            userInput: {
              emailSettings: ${emailSettings},
              profilSettings: ${profilSettings}
            }
          ) {
            _id
          }
        }
          `,
  };

  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/graphql`,
    method: "POST",
    data: requestBody,
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Unauthenticated!");
  }

  return true;
};
