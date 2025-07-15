import { sequelize, DataTypes } from "../lib/sequelizedb.js";
import { User } from "./User.js";

export const Look = sequelize.sequelize.define("look", {
  id: {
    type: DataTypes.INTEGER,
    field: "id",
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    required: false,
  },
  mediaId: {
    type: DataTypes.STRING,
    required: true,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  season: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  items: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    required: true,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  likes: {
    // array of user id
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
  dislikes: {
    // array of user id
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    defaultValue: [],
  },
});

User.hasMany(Look);
Look.belongsTo(User);
