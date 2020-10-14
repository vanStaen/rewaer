exports.User = {
  /*login: (args) => {
    return {
      token: "123456789",
      userId: "123456789",
    };
  },*/
  users: () => {
    const users = [
      {
        _id: "5f7b6eb267bc3d80cd193d0e",
        name: "Clément",
        email: "clement.vanstaengmail.com",
        dateCreated: "03-09-2019",
        encryptedPWD: "61cf1385b1755bbee51cfc02400b1825",
        avatar: "1.jpg",
        active: true,
      },
      {
        _id: "5f7b703967bc3d80cd193d10",
        name: "Theresa",
        email: "theresa.pogge@gmail.com",
        dateCreated: "03-09-2019",
        encryptedPWD: "931dd0ac6207488f6e0a63acd7eb977e",
        avatar: "2.jpg",
        active: true,
      },
    ];

    return users;
  },
  /*createUser: (args) => {
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
  }*/
};

//updateUser(userId: ID!, userInput: UserInputData!): User!
//deleteUser(userId: ID!): User!
