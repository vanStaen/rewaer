import { sequelize, DataTypes } from "../lib/sequelizedb.js";

export const Honeypot = sequelize.sequelize.define("honeypot", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  honeypotValue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
