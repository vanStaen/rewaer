import axios from "axios";

export const postAddUser = async (
  firstName,
  lastName,
  userName,
  email,
  password
) => {
  const requestBody = {
    query: `mutation {
                addUser (
                    userInput: { 
                        firstName: "${firstName}", 
                        lastName: "${lastName}",
                        userName: "${userName}", 
                        email: "${email}", 
                        password: "${password}", 
                        }
                    ) {
                    _id
                    email
                    }
                }`,
            };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios(
      {
        url: process.env.REACT_APP_API_URL + `/graphql`,
        method: "POST",
        data: requestBody,
      },
      {
        headers: headers,
      }
    );
    return response.data;
  } catch(err) {
    if (err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } 
    return err.response.data;
  }
  
};
