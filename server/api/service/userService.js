import { User } from "../../models/User.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { mailService } from "./mailService.js";

export const userService = {
  async taken(username) {
    const foundUser = await User.findOne({
      where: { userName: username },
    });
    if (!foundUser) {
      return false;
    } else {
      return true;
    }
  },

  async email(email) {
    const foundUser = await User.findOne({
      where: { email },
    });
    if (!foundUser) {
      return false;
    } else {
      return true;
    }
  },

  async validtoken(token) {
    try {
      jsonwebtoken.verify(token, process.env.AUTH_SECRET_KEY_RECOVERY);
    } catch (err) {
      return false;
    }
    return true;
  },

  async changepassword(token, password) {
    try {
      const decodedToken = jsonwebtoken.verify(
        token,
        process.env.AUTH_SECRET_KEY_RECOVERY,
      );
      const email = decodedToken.email;
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.update(
        { password: hashedPassword },
        {
          where: {
            email,
          },
          returning: true,
          plain: true,
        },
      );
      return true;
    } catch (err) {
      return false;
    }
  },

  async emailverified(token) {
    try {
      const decodedToken = jsonwebtoken.verify(
        token,
        process.env.AUTH_SECRET_KEY_EMAILVERIFY,
      );
      const email = decodedToken.email;
      await User.update(
        { verifiedEmail: true },
        {
          where: {
            email,
          },
          returning: true,
          plain: true,
        },
      );
      // Send a mail to admin
      await mailService.mail(
        process.env.ADMIN_EMAIL,
        "Rewaer | New User's email validated!",
        `The following email has just been validated: ${email}`,
      );
      return true;
    } catch (err) {
      return false;
    }
  },
};
