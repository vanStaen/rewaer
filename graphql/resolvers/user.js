const User = require("../../models/User");

exports.User = {
  users: async () => {
    return User.find().then((users) => {
      return users.map((user) => {
        return { ...user._doc };
      });
    });
  },
  createUser: async (args) => {
    const user = new User({
      name: args.userInput.name,
      email: args.userInput.email,
      password: args.userInput.password,
      active: true,
    });
    const savedUser = await user.save();
    return savedUser;
  },
  deleteUser: async (args) => {
    const removedUser = await User.deleteOne({ _id: args.userId });
    return removedUser;
  },
  updateUser: async (args) => {
    const updateField = {};
    if (args.userInput.name) {
      updateField.name = args.userInput.name;
    }
    if (args.userInput.email) {
      updateField.email = args.userInput.email;
    }
    if (args.userInput.password) {
      updateField.password = args.userInput.password;
    }
    if (args.userInput.active !== undefined) {
      updateField.active = args.userInput.active;
    }
    const updatedUser = await User.updateOne(
      { _id: args.userId },
      { $set: updateField }
    );
    return updatedUser;
  },
};

//updateUser(userId: ID!, userInput: UserInputData!): User!
