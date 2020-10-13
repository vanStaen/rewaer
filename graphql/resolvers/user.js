exports.UserResolver = {
  login: (args) => {
    return {
      token: "123456789",
      userId: "123456789",
    };
  },
  createUser: (args) => {
    const userName = args.userInput.name;
    const userEmail = args.userInput.email;
    const encryptedPWD = args.userInput.encryptedPWD;
    const avatar = args.userInput.avatar;
    return {
      _id: "123456789",
      name: userName,
      email: userEmail,
      dateCreated: Date.now(),
      encryptedPWD: encryptedPWD,
      avatar: avatar,
      active: true,
    };
  },
};

//updateUser(userId: ID!, userInput: UserInputData!): User!
//deleteUser(userId: ID!): User!
