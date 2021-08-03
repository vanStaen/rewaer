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
    allowNull: false,
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
    defaultValue: "[]",
  },
  profilSettings: {
    type: DataTypes.STRING,
    defaultValue: "[]",
  },
  friends: {
    type: DataTypes.STRING,
    defaultValue: "[]",
  },
  active: {
    type: DataTypes.BOOLEAN,
    required: true,
  },
  lastActive: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = {
  User
};
