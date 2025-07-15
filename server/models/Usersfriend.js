import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Usersfriend = sequelize.sequelize.define("usersfriend", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pending: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
