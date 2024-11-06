import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Notification = sequelize.sequelize.define("notification", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
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
    type: DataTypes.INTEGER,
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

/*
types:
  0: General
  1: New Friend request ✓
  2: New Follower ✓
  3: New Message
  4: New item from friends/followed ✓
  5: New look from friend/followed ✓
  6: Someone shared an item with you (theirs)
  7: Someone wants to share an item (yours)
  8: Someone made you a Look
  9: Someone has an Item for sale
  10: Someone has an Item to give away
  11: Someone used your Item in a Look
  12: New Item like ✓
  13: New Look like ✓
  14: New Avatar from friends/followed ✓
  15: New Item dislike ✓
  16: New Look dislike ✓
  17: Friend requested accepted ✓
*/