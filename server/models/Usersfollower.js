import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Usersfollower = sequelize.sequelize.define("usersfollower", {
  _id: {
    type: DataTypes.INTEGER,
    field: "_id",
    autoIncrement: true,
    primaryKey: true,
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followedId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
