const { User } = require("../../models/User");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.authService = {
  async login(email, username, password, remindMe) {
    const findUser = User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    });
    if (!findUser) {
      throw new Error("User does not exist!");
    } else {
      const user = result.rows[0];
      const isValid = await bcrypt.compare(password, user.pwd);
      if (!isValid) {
        throw new Error("Password is incorrect!");
      }
      // Set token in session cookie
      const accessToken = await jsonwebtoken.sign(
        { userId: findUser._id },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "15m" }
      );
      req.session.token = accessToken;
      // Set token in session cookie
      if (remindMe) {
        const refreshToken = await jsonwebtoken.sign(
          { userId: findUser._id },
          process.env.AUTH_SECRET_KEY_REFRESH,
          { expiresIn: "7d" }
        );
        req.session.refreshToken = refreshToken;
      }
      // Update lastLogin in user table
      await User.update(
        { lastActive: Date.now() },
        { where: { _id: findUser._id } }
      );     
      // Return true if success
      return true;
    }
  },

  async logOut(userId) {
    // delete all session cookie 
    req.session = null
    // Return true if success
    return true;
  },

};
