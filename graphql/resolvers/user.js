const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../models/User");
require("dotenv/config");

exports.User = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Password is incorrect!");
    }
    const token = await jsonwebtoken.sign(
      { userId: user.id, email: user.email },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: "2h" }
    );
    return { userId: user.id, token: token, tokenExpiration: 2 };
  },
  // todo: Should be deactivated
  users: async () => {
    const users = await User.find();
    return users.map((user) => {
      return {
        ...user._doc,
        dateCreated: new Date(user._doc.dateCreated).toISOString(),
        password: undefined,
      };
    });
  },
  createUser: (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error("User exists already");
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
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
  // todo: user should only allowed to delete it's own profile
  deleteUser: async (args) => {
    const removedUser = await User.deleteOne({ _id: args.userId });
  },
  // todo: user should only update it's own profile
  updateUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
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
