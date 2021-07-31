const { sequelize, DataTypes } = require('../lib/sequelizedb');

const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  dateCreated: {
    type: DataTypes.STRING,
    default: Date.now,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
  avatar: {
    type: DataTypes.STRING,
    required: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    required: true,
  },
});

module.exports = {
  User
};
