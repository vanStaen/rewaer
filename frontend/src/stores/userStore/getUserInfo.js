import axios from "axios";

export const getUserInfo = async () => {
    const requestBody = {
        query: `
        {
            getUser {
              firstName,
              lastName,
              userName,
              email,
              avatar,
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

    console.log(response.data.data.getUser);
    return response.data.data.getUser;
};