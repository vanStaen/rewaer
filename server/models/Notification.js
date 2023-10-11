const { sequelize, DataTypes } = require('../lib/sequelizedb');

const Notification = sequelize.define("notification", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  media_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    required: false,
  },
  description: {
    type: DataTypes.STRING,
    required: false,
  },
  action_data: {
    type: DataTypes.STRING,
    required: false,
  },
  type: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = {
  Notification,
};

/*
types:
0: General
1: Friend request
2: New Follower
3: New Messages
4: New item from friends/followed
5: New look from friend/followed
6: Someone shared an item with you (theirs)
7: Someone wants to share an item (yours)
8: Someone made you a Look
*/