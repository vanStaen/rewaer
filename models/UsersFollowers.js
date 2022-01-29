const { sequelize, DataTypes } = require('../lib/sequelizedb');

const UsersFollowers = sequelize.define("usersFollowers", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  follower_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followed_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = {
  UsersFollowers
};
