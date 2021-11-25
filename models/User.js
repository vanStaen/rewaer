const { sequelize, DataTypes } = require('../lib/sequelizedb');

const User = sequelize.define("user", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
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
      isEmail: true
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
  language: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3,
  },
  friends: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastActive: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = {
  User
};
