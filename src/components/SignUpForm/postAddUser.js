export const postAddUser = async (
  firstName,
  lastName,
  userName,
  email,
  password,
  language,
) => {
  const requestBody = {
    query: `mutation ( $firstName: String, 
                       $lastName: String, 
                       $userName: String, 
                       $email: String, 
                       $password: String,
                       $language: String ) {
                addUser (
                    userInput: { 
                        firstName: $firstName, 
                        lastName: $lastName,
                        userName: $userName, 
                        email: $email, 
                        password: $password, 
                        language: $language,
                        }
                    ) {
                    id
                    email
                    }
                }`,
    variables: {
      firstName,
      lastName,
      userName,
      email,
      password,
      language,
    },
  };

  try {
    const response = await fetch(process.env.API_URL + `/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    }
    return err.response ? err.response.data : null;
  }
};
