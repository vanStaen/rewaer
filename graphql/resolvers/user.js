const User = require("../../models/User");

exports.User = {
  users: async () => {
    const users = await User.find();
    return users;
  },
  createUser: async (args) => {
    const user = new User({
      name: args.userInput.name,
      email: args.userInput.email,
      encryptedPWD: args.userInput.encryptedPWD,
      active: true,
    });
    if (!user.name || !user.email || !user.encryptedPWD) {
      return res.status(400).json({ error: `Error: Some field are missing.` });
    }
    try {
      const savedUser = await user.save();
      return savedUser;
    } catch (err) {
      return { message: err };
    }
  },
};

//updateUser(userId: ID!, userInput: UserInputData!): User!
//deleteUser(userId: ID!): User!
