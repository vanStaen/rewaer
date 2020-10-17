const bcrypt = require("bcryptjs");
const User = require("../../models/User");

exports.User = {
  users: async () => {
    return User.find().then((users) => {
      return users.map((user) => {
        return { ...user._doc };
      });
    });
  },
  createUser: (args) => {
    return bcrypt
      .hash(args.userInput.password, 12)
      .then((hashedPassword) => {
        const user = new User({
          name: args.userInput.name,
          email: args.userInput.email,
          password: hashedPassword,
          active: true,
        });
        return user.save();
      })
      .then((result) => {
        return { ...result._doc, password: null };
      })
      .catch((err) => {
        throw err;
      });
  },
  deleteUser: async (args) => {
    const removedUser = await User.deleteOne({ _id: args.userId });
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
      updateField.password = await bcrypt.hash(args.userInput.password, 12);
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
