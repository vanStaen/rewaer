import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { Usersfriend } from "./Usersfriend.js";
import { Usersfollower } from "./Usersfollower.js";

export const User = sequelize.sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
  avatar: {
    type: DataTypes.STRING,
    required: false,
  },
  emailSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "{}",
  },
  profilSettings: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "{}",
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "en",
  },
  gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  usernameChange: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lastActive: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.belongsToMany(User, {
  as: "friends",
  foreignKey: "userId",
  through: Usersfriend,
});

User.belongsToMany(User, {
  as: "Usersfriends",
  foreignKey: "friendId",
  through: Usersfriend,
});

User.belongsToMany(User, {
  as: "followed",
  foreignKey: "followerId",
  through: Usersfollower,
});

User.belongsToMany(User, {
  as: "followers",
  foreignKey: "followedId",
  through: Usersfollower,
});
